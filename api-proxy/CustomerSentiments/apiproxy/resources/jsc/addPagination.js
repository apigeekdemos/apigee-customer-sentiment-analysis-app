var comments = context.getVariable("response.content");
var commentsJSON = null;
if (comments !== null)
    commentsJSON = JSON.parse(comments);

var largest = 0;
var smallest = 0;
for(var c in commentsJSON) {
    if (commentsJSON[c] !== null && commentsJSON.hasOwnProperty(c)) {
        if ((largest === 0) || (commentsJSON[c].timestamp > largest)) 
            largest = commentsJSON[c].timestamp;
        if ((smallest === 0) || (commentsJSON[c].timestamp < smallest)) 
            smallest = commentsJSON[c].timestamp;
        commentsJSON[c].timestamp *= -1;
    }
}

var org = context.getVariable("organization.name");
var env = context.getVariable("environment.name");
var bp = context.getVariable("proxy.basepath");
var ps = context.getVariable("proxy.pathsuffix");

var pagination = {};
pagination.pagesize = context.proxyRequest.queryParams['pagesize'];
pagination.next = "http://" + org + "-" + env + ".apigee.net" + bp + ps + "?pagesize=" + pagination.pagesize + "&startat=" + (largest+1);
//pagination.next += "&prev=" + smallest;

var prev = context.getVariable("pagination.prev");
if (prev !== null)
    pagination.prev = prev; //"http://" + org + "-" + env + ".apigee.net" + bp + ps + "?pagesize=" + pagination.pagesize + "&startat=" + prev;

var current = context.getVariable("startat");
if (current !== null)
    context.setVariable("pagination.prev", "http://" + org + "-" + env + ".apigee.net" + bp + ps + "?pagesize=" + pagination.pagesize + "&startat=" + current);
else
   context.setVariable("pagination.prev", "http://" + org + "-" + env + ".apigee.net" + bp + ps + "?pagesize=" + pagination.pagesize + "&startat=" + smallest);
context.setVariable("pagination.startat", ""+(largest+1));

var result = {"comments": commentsJSON, "pagination": pagination};
context.setVariable("response.content", JSON.stringify(result));

    
    