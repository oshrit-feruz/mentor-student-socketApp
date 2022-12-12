import express, { Request, Response } from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { questionsList } from "./db/query";
import { Server } from "socket.io";

let isMentor = true;
let server_port = process.env.YOUR_PORT || process.env.PORT || 4040;
let allClients: any[] = [];
const app = express();
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://localhost:3000", "https://localhost:3000/codeBlock"],
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket: any) => {
  socket.on("startCode", (arg: string) => {
    allClients.push(socket.id);
    console.log(allClients);
    if (allClients.length > 1) {
      isMentor = false;
    }
  });

  socket.emit("isMentor", isMentor);
  socket.on("code-block", (codeData: any) => {
    console.log(codeData);
    io.emit("mentorCode", codeData);
  });
  socket.on("disconnect", (_reason: any) => {});
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export interface questionBlock {
  title: string;
  description: string;
  code: string;
  solution: string;
}

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
