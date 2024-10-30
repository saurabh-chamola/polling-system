import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["13.202.251.176:9092"],
  connectionTimeout: 30000, // 30 seconds timeout
});

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Admin Connection Success...");

  const topicName = "polls";

  // Check if the topic already exists
  const existingTopics = await admin.listTopics();
  if (!existingTopics.includes(topicName)) {
    try {
      console.log(`Creating Topic ${topicName}`);
      await admin.createTopics({
        topics: [{ topic: topicName, numPartitions: 1 }],
      });
      console.log(`Topic Created Successfully [${topicName}]`);
    } catch (error) {
      console.error("Failed to create topic:", error);
    }
  } else {
    console.log(`Topic ${topicName} already exists, skipping creation.`);
  }

  console.log("Disconnecting Admin...");
  await admin.disconnect();
}

init().catch((err) => console.error("Error in init:", err));
