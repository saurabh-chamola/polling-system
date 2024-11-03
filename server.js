import express from "express";
import http from "http"; // Import the http module
import pollRoutes from "./src/routes/poll.js";
import { Server as SocketIO } from "socket.io";
import sequelize from "./src/configs/db.js";
import path from "path";
import { init, runConsumer } from "./src/configs/kafka.js"
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const server = http.createServer(app);

export const io = new SocketIO(server, {
  cors: {
    origin: 'https://task-managment-fa53.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }
});



// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:");
  });
});



// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'))



const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/v1/poll", pollRoutes);


// Start the server after setting up Socket.IO
server.listen(PORT, async () => {
  await init()
  await runConsumer()
  console.log(`App running on port ${PORT}`);
});
