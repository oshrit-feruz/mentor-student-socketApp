import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LobbyPage from "./routes/lobbyPage";
import CodeBlockPage from "./routes/codeBlock";
import { io } from "socket.io-client";

import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
export const socket = io("http://localhost:4040", { transports: ["websocket"] });
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyPage />}></Route>
        <Route
          path="/codeBlock"
          element={<CodeBlockPage  />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
