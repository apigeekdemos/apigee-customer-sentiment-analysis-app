var commentId = context.getVariable("commentId");
var firebasePath = "/db/comments/" + commentId + ".json";

context.setVariable("target.copy.pathsuffix", false);
context.setVariable("firebase.path", firebasePath);
