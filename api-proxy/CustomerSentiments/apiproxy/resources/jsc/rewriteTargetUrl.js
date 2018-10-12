var pagesize = context.getVariable("request.queryparam.pagesize");
if (pagesize === null)
    pagesize = 20;

var firebasePath = "/db/comments.json?limitToFirst=" + pagesize;

var startat = context.getVariable("request.queryparam.startat");
if (startat !== null)
    firebasePath += "&startAt=" + startat;
var username = context.getVariable("username");
if (username !== null)
    firebasePath += "&orderBy=\"username\"&equalTo=\"" + username + "\"";
else
    firebasePath += "&orderBy=\"timestamp\"";

context.setVariable("target.copy.pathsuffix", false);
context.setVariable("firebase.path", firebasePath);

