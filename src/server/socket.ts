import { Server, Socket } from "socket.io";
import { Client, Pool } from "./types";
import { expressServer } from "./express";

let allClients: Client[] = [];
const pools: Record<number | string, Pool> = {};
export function socketServer() {
  // WebSocket server setting and events
  const io = new Server(expressServer(), {
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
    function removeClient(client: Client) {
      const firstIndex = allClients.indexOf(client);
      allClients.splice(firstIndex, 1);
      const secondIndex = pools[client.poolId]?.clinets.indexOf(client);
      pools[client.poolId]?.clinets.splice(secondIndex);
    }
  });
}
// When user disconnect or return back from the code block
