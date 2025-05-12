const serverless = require("serverless-http");
const app = require("./dist/app").default;

const handler = serverless(app);

module.exports.handler = async (event, context) => {
    return await handler(event, context);
};