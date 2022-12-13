import express, { Request, Response } from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { questionsList } from "./db/query";
import { Server, Socket } from "socket.io";

let server_port = process.env.YOUR_PORT || process.env.PORT || 4040;

// Interfaces and Types
export interface questionBlock {
  id: number;
  title: string;
  description: string;
  code: string;
  solution: string;
}
type Client = {
  id: string;
  poolId: number;
  mentor: boolean;
  socket: Socket;
};
type Pool = {
  poolId: number;
  clinets: Client[];
};

let allClients: Client[] = [];
const pools: Record<number | string, Pool> = {};
// Setting the server
const app = express();
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
const jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(jsonParser);
app.use(cors());
const httpServer = createServer(app);

// WebSocket server setting and events
const io = new Server(httpServer, {
  cors: {
    origin: ["https://localhost:3000", "https://localhost:3000/codeBlock"],
    methods: ["GET", "POST"],
  },
});
// When client is connect to one of the pools
io.on("connection", (socket: Socket) => {
  const CLIENT_ID = socket.id;

  const client = {
    id: CLIENT_ID,
    socket,
  } as Client;
  socket.emit("poolId");
  // Checking to wich code block the user connected to set him as Mentor/Student

  socket.on("poolId", (arg) => {
    if (allClients.indexOf(client) === -1) {
      const pID: number = arg.poolId;
      // Checking if student get into code block when there are someone connected
      //  (could be not the mentor - if the mentor leave after another student connect)
      client.mentor = !pools[pID]?.clinets.find((c) => c.mentor);
      client.poolId = pID;
      // If pool doen't exist - create a pool object
      if (!pools[pID]) {
        pools[pID] = {
          clinets: [],
          poolId: pID,
        };
      }
      // Save client in pool and client list
      allClients.push(client);
      pools[pID].clinets.push(client);
      socket.emit("isMentor", { isMentor: client.mentor });
    }
  });
  //  The Mentor will get the code by "code-block" and the student send the code by emit "code-block"
  socket.on("code-block", (codeData: { code: string }) => {
    console.log(codeData);
    const { clinets } = pools[client.poolId];
    clinets.forEach((poolClient) => {
      if (poolClient.mentor) {
        poolClient.socket.emit("code-block", {
          code: codeData.code,
        });
      }
    });
  });
  socket.on("disconnect", (_reason: any) => {
    // Remove client from pool and clients array
    if (client.poolId) {
      console.log(CLIENT_ID, "diconnected");

      removeClient(client);
    }
  });
});
// Get Request bt the client- using query to the DataBase
app.get("/questions", async (req: Request, res: Response) => {
  let result = await questionsList();
  res.json(result);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (_req: any, res: any) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}
httpServer.listen(server_port, () =>
  console.log(`Listening on ${server_port}`)
);
// When user disconnect or return back from the code block
function removeClient(client: Client) {
  const firstIndex = allClients.indexOf(client);
  allClients.splice(firstIndex, 1);
  const secondIndex = pools[client.poolId]?.clinets.indexOf(client);
  pools[client.poolId]?.clinets.splice(secondIndex);
}
