var config = {};

config.defaultOrg = "demo30";
config.defaultEnv = "test";
config.defaultUsername = "someuser@google.com";
config.defaultFirebaseHost = "apigee-partner-demo.firebaseio.com";

// should rarely need to change these
config.proxyDir = "./CustomerSentimentsProxy";
config.sharedFlowDir = "./FirebaseAuthSharedFlow";
config.proxyBasepath = "/v1/customersentiments";
config.kvmName = "FirebaseKVM2";
config.nlpkvmName = "NLPKVM";
config.svcacct = "svcacct";
config.oauthUrl = "https://login.apigee.com/oauth/token";
config.apigeeMgmtUrl = "https://api.enterprise.apigee.com/v1";
config.apiSuffix = ".apigee.net";
module.exports = config;
