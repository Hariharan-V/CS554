const NRP = require("node-redis-pubsub");
const config = {
  port: 6379, // Port of your locally running Redis server
  scope: "unique_IPC_Assignment6" // Use a scope to prevent two NRPs from sharing messages
};

const nrp = new NRP(config); // This is the NRP client

module.exports = nrp;