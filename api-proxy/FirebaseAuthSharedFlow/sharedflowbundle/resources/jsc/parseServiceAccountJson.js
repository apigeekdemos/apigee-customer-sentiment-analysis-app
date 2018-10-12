var serviceAccountJsonStr = context.getVariable("private.service_account_json");
if (serviceAccountJsonStr !== null) {
    var serviceAccountJson = JSON.parse(serviceAccountJsonStr);
    context.setVariable("private.key", serviceAccountJson.private_key);
    context.setVariable("private.kid", serviceAccountJson.private_key_id);
}