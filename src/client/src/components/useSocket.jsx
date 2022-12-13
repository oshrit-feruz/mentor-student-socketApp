import { useEffect, useState } from "react";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

/**
 *
 * @param { string | Partial<ManagerOptions & SocketOptions>} uri
 * @param {Partial<ManagerOptions & SocketOptions>} opt
 * @param {(socket: Socket<DefaultEventsMap, DefaultEventsMap>)=>any } initSocket
 * @returns
 */
const useSocket = (uri, opt = undefined, initSocket = undefined) => {
  const [socket, setSocket] = useState(io(uri, opt));
  useEffect(() => {
    if (initSocket) initSocket(socket);
  }, [socket]);

  useEffect(() => {
    console.log("socket connecting");
  }, [socket]);
  return socket;
};

export default useSocket;
