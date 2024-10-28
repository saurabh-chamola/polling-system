import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["13.202.251.176:9092"],
  connectionTimeout: 30000, // 30 seconds timeout
});

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  await admin.connect(); // Don't forget to await here
  console.log("Admin Connection Success...");

  console.log("Creating Topic polls");
  await admin.createTopics({
    topics: [
      {
        topic: "polls",
        numPartitions: 1,
      },
    ],
  });
  console.log("Topic Created Success [polls]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

init().catch(err => console.error("Error in init:", err));
