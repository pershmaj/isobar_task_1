const redis = require("redis");
const logger = require('./winston');

const client = redis.createClient({
        port: 6379,
        host: 'redis'
});
 
client.on("error", function(error) {
  logger.error(error);
});

module.exports = client;