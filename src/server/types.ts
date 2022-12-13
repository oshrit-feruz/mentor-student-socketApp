import { Socket } from "socket.io";

// Interfaces and Types
export interface questionBlock {
  id: number;
  title: string;
  description: string;
  code: string;
  solution: string;
}
export type Client = {
  id: string;
  poolId: number;
  mentor: boolean;
  socket: Socket;
};
export type Pool = {
  poolId: number;
  clinets: Client[];
};
