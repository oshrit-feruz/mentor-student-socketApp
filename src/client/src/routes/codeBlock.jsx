import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
export default function CodeBlockPage() {
  const socket = io("http://localhost:4040", { transports: ["websocket"] });
  const chossenQuestion = useSelector(
    (state) => state.questions.chossenQuestion
  );
  const [isMentor, setIsMentor] = useState(true);
  const [codeData, setCodeData] = useState(chossenQuestion.code);

  useEffect(() => {
    let mounted = true;
    function setConnection() {
      if (window.location.pathname === "/codeBlock") {
        socket.on("connect", () => {
          console.log("one time"); // true
        });
        socket.emit("startCode", "yes");
      }
    }
    setConnection();
    return () => (mounted = false);
  }, []);

  socket.on("isMentor", (arg) => {
    console.log(arg);
    setIsMentor(arg);
  });
  // if student- send data to socket
  useEffect(
    () => {
      if (isMentor === true) {
        socket.on("mentorCode", (codeData) => {
          console.log(codeData);
          setCodeData(codeData);
        });
      }
    },
    [isMentor],
    [codeData],
    []
  );
  useEffect(() => {
    if (isMentor === false) socket.emit("code_change_from_client", codeData);
  }, [codeData]);

  console.log(chossenQuestion);
  return (
    
    <>
    <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 1 }}>
      {chossenQuestion.title}
      </Typography>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
      </IconButton>
       
      <CodeMirror
        value={codeData}
        readOnly={isMentor}
        onChange={(e) => setCodeData(e)}
        options={{
          theme: "monokai",
          keyMap: "sublime",
          mode: "javascript",
        }}
      />
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">{chossenQuestion.description}</Typography>
        </div>
      </Box>
    </Card>
     
    </>
  );
}