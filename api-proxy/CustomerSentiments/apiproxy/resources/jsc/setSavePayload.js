var sentimentStr = context.getVariable("response.content");
var sentiment = null;
if (sentimentStr !== null)
    sentiment = JSON.parse(sentimentStr);

var comment = context.getVariable("comment");
var savePayload = {};
savePayload.message = comment;
savePayload.timestamp = context.getVariable("client.received.end.timestamp");
if (savePayload.timestamp !== null)
    savePayload.timestamp = (-1) * savePayload.timestamp;
savePayload.username = context.getVariable("commentUsername");
if (savePayload.username === null)
    savePayload.username = "someuser";
savePayload.sentiment = sentiment;

context.setVariable("savePayload", JSON.stringify(savePayload));

