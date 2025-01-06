const Redis = require("ioredis");

const client = new Redis({
  host: "redis-15466.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com",
  port: 15466,
  password: "KPkPL3pny0smdrkmCBsjsKPalbnnCz3K",
});
client.on("connect", () => console.log("Redis Client connect success"));
client.on("error", (err) => console.log("Redis Client Error", err));

module.exports = client;
