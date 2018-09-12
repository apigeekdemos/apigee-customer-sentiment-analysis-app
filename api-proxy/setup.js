var prompt = require("prompt");
var colors = require("colors/safe");
var replace = require("replace-in-file");
var randomstring = require("randomstring");
var request = require("request");
var config = require("./config.js");

var defaultSecret = randomstring.generate({length:config.secretLength, charset:config.secretCharacterSet});

var schema = {
    properties: {
      org: {
        description: colors.yellow("Please provide the Apigee Edge Organization name"),
        type: "string",
        message: colors.red("Apigee Edge Organization name cannot be empty!"),
        default: config.defaultOrg,
        required: true
      },
      env: {
        description: colors.yellow("Please provide the Apigee Edge Environment name"),
        type: "string",
        message: colors.red("Apigee Edge Environment name cannot be empty!"),
        default: config.defaultEnv,
        required: true
      },
      username: {
        description: colors.yellow("Please provide the Apigee Edge username"),
        type: "string",
        message: colors.red("Apigee Edge username cannot be empty!"),
        default: config.defaultUsername,
        required: true
      },
      password: {
        description: colors.yellow("Please provide the Apigee Edge password"),
        type: "string",
        message: colors.red("Apigee Edge password cannot be empty!"),
        hidden: true,  
        replace: '*',
        required: true
      },
      firebaseHost: {
        description: colors.yellow("Please provide the Firebase Host name"),
        type: "string",
        message: colors.red("Firebase Host name cannot be empty!"),
        default: config.defaultFirebaseHost,
        required: true
      },
      serviceAccountFilename: {
        description: colors.yellow("Please provide the json filename of your GCP Service Account"),
        type: "string",
        message: colors.red("Service Account filename cannot be empty!"),
        required: true
      },
    }
  };
 
//
// Start the prompt
//
prompt.start();
prompt.get(schema, function (err, options) {
    replaceServiceAccountJson(options);
    replaceFirebaseHost(config.proxyDir, options);
    deployProxyAndDependencies(config.proxyDir, options);
});

/*
Replace the service account json in the edge.json file.
*/
function replaceServiceAccountJson(options) {
  let svcAccountJson = require(options.serviceAccountFilename);
  let svcAccountStr = JSON.stringify(svcAccountJson).replace(/\r?\n|\r/g, " ");
  options.serviceAccount = svcAccountStr;
}

/*
Replace the firebase-hostname in the edge.json file.
*/
function replaceFirebaseHost(proxyDir, options){
  var optionsReplacer = {
    files: proxyDir + '/edge.json',
    from: /"host"[ ]*:[ ]*".*"/g,
    to: '"host" : "' + options.firebaseHost + '"',
  };

  try {
    const changes = replace.sync(optionsReplacer);
    console.log('Modified files:', changes.join(', '));
  }
  catch (error) {
    console.error('Error occurred trying to update the firebase host.');
    //console.error('Error occurred trying to update the firebase host:', error);
  }
}

/*
creates the target server and deploys the proxy.
*/
function deployProxyAndDependencies(proxyDir, options){
  const mvn = require('maven').create({
        debug: true,
        cwd: '.',
        profiles: [options.env],
        debug: false
      });

  var mvnArgs = {
    'username': options.username,
    'password': options.password,
    'org': options.org,
    'options': 'update',
    'apigee.config.options': 'update'
  };
  mvn.execute(['clean', 'install'], mvnArgs).then(() => {
    console.log(proxyDir+ ' successfully configured!');
    setKVMSecret(options);
  });
}

function setKVMSecret(options){
  // get token
  var reqOptions = {
    method: "POST",
    uri: config.oauthUrl,
    headers: {
      Authorization: "Basic ZWRnZWNsaTplZGdlY2xpc2VjcmV0",
      Accept: "application/json;charset=utf-8"
    },
    form: {
      username: options.username,
      password: options.password,
      grant_type: "password"
    }
  };
  request(reqOptions, function (error, response, body) {
    if (response.statusCode != 200) {
      console.log("Failed to retrieve token for Apigee management API.");
      process.exit(0);
    }
    var resp = JSON.parse(body);
    var access_token = resp.access_token;

    var kvmBody = {
      "name": "service_account_json",
      "value": options.serviceAccount
    };
    reqOptions = {
      method: "PUT",
      uri: config.apigeeMgmtUrl + "/organizations/" + options.org + "/environments/" + options.env +
           "/keyvaluemaps/" + config.kvmName + "/entries/service_account_json",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(kvmBody)
    };
    request(reqOptions, function (error, response, body) {
      if (response.statusCode != 200) {
        console.log("Failed to update KVM using Apigee management API.");
        process.exit(0);
      }
      console.log("");
      console.log(colors.blue("------------------------------------------------------------------------"));
      console.log(colors.blue("PROXY:  https://" + options.org + "-" + options.env + config.apiSuffix + config.proxyBasepath));
      console.log(colors.blue("------------------------------------------------------------------------"));
    });
  });
}
