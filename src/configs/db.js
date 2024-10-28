import pkg from "pg";
const { Client } = pkg;

const dbConnect = async () => {
    try {
        const client = new Client({
            user: "postgres",          // Changed 'username' to 'user'
            port: 5432,
            password: "9410987248",
            host: "localhost",
            database: "pollingSystem"
        });
        await client.connect();
        console.log("Connected to database successfully!!");
    } catch (e) {
        console.log(`Database connection failed!! - ${e?.message}`);
    }
};

export default dbConnect;
