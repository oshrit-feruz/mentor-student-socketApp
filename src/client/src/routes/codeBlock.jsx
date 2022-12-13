import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useBlock } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import { vscodeDark } from "@uiw/codemirror-themes-all";
import useBeforeUnmount from "../components/useBeforeUnmount";
import useSocket from "../components/useSocket";

export default function CodeBlockPage() {
  const codeId = +useParams().codeId;
  const socket = useSocket(
    "http://localhost:4040",
    {
      transports: ["websocket"],
    },
    (socket) => {
      socket.on("connect", () => {
        console.log("one time"); // true
      });
      socket.on("mentorCode", (codeData) => {
        if (isMentor) {
          console.log(codeData);
          setCodeData(codeData);
        }
      });

      socket.on("isMentor", ({ isMentor }) => {
        console.log(isMentor);
        setIsMentor(isMentor);
      });

      socket.on("poolId", () => {
        socket.emit("poolId", {
          poolId: codeId,
        });
      });

      socket.on("code-block", (data) => {
        setCodeData(data.code);
      });
    }
  );
  const dispatch = useDispatch();
  const questionsList = useSelector((state) => state.questions.questionsList);

  const question =
    questionsList.find((question) => question.id == codeId) || {};

  const [isMentor, setIsMentor] = useState(true);
  const [title, setTitle] = useState("");
  const [codeData, setCodeData] = useState(question.code);
  useEffect(() => {
    isMentor ? setTitle("Your student code") : setTitle("good luck student :)");
  }, [isMentor]);

  useEffect(() => {
    if (!isMentor) socket.emit("code-block", { code: codeData });
    if (codeData === question.solution && codeData !== undefined) {
      setTitle("That's right!!😊😊😊");
    }
    console.log(question);
  }, [codeData]);

  useEffect(() => {
    setCodeData(question.code);
  }, [question]);

  return (
    <>
      <h2 className="title">{title}</h2>

      {useBeforeUnmount(() => {
        // close connection
        socket.disconnect();
      })}
      <Card variant="outlined" sx={{ width: 320 }}>
        <Typography
          level="h2"
          fontFamily={"Varela Round"}
          fontSize="30px"
          fontWeight={"900"}
          sx={{ mb: 1 }}
        >
          {question.title}
        </Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        ></IconButton>

        <CodeMirror
          value={codeData}
          readOnly={isMentor}
          onChange={setCodeData}
          theme={vscodeDark}
          options={{
            keyMap: "sublime",
            mode: "javascript",
          }}
        />
        <Box sx={{ display: "flex" }}>
          <div>
            <Typography fontFamily={"Varela Round"} level="body3">
              {question.description}
            </Typography>
          </div>
        </Box>
      </Card>
    </>
  );
}
