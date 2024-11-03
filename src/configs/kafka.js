import { Kafka } from "kafkajs";
import { PollOption, Vote } from "./db.js";

export const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["13.202.251.176:9092"],
  connectionTimeout: 30000,
});

// section for initialization Kafka topics
export async function init() {
  const admin = kafka.admin();
  await admin.connect();
  console.log("Admin Connected successfully...");

  const topicName = "polls";

  try {
    const existingTopics = await admin.listTopics();
    if (!existingTopics.includes(topicName)) {
      console.log(`Creating Topic ${topicName}`);
      await admin.createTopics({
        topics: [{ topic: topicName, numPartitions: 1 }],
      });
      console.log(`Topic Created Success [${topicName}]`);
    } else {
      console.log(`Topic [${topicName}] already exists, stopped creation.`);
    }
  } catch (err) {
    console.error("Error creating topic:", err);
  } finally {
    console.log("Disconnecting Admin..");
    await admin.disconnect();
  }
}

// run consumer
export const runConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "vote-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "polls", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const voteData = JSON.parse(message.value.toString());
      const { pollId, option, votedBy } = voteData;

      // Store the vote in the database
      await Vote.create({ pollId, option, votedBy });
      await PollOption.increment({ count: 1 }, { where: { id: option } });

      console.log(`created vote for poll ${pollId} from ${votedBy}`);
    },
  });
};
