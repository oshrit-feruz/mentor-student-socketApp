import express, { Request, Response } from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { questionsList } from "./db/query";
let server_port = process.env.YOUR_PORT || process.env.PORT || 4040;

export function expressServer() {
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
  return httpServer;
}
