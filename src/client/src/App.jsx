import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import LobbyPage from "./routes/lobbyPage";
import CodeBlockPage from "./routes/codeBlock";
import { setQuestionsList, setChossenQuestion } from "./redux/questionsSlice";
import config from "./assets/config";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const questionsList = useSelector((state) => state.questions.questionsList);
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    function getQuestions() {
      if (questionsList.length !== 4) {
        axios
          .get(`${config.apiHost}/questions`)
          .then((res) => {
            console.log(res.data);
            dispatch(setQuestionsList(res.data));
          })
          .catch((err) => alert(`failed to get data please try again`));
      }
    }
    getQuestions();
    return () => (mounted = false);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyPage />}></Route>
        <Route path="/codeBlock/:codeId" element={<CodeBlockPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
