import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setChossenQuestion } from "../redux/questionsSlice";
import { Link } from "react-router-dom";
export default function QuestionsContainer() {
  const [questionsUi, setQuestionsUi] = useState([]);
  const questionsList = useSelector((state) => state.questions.questionsList);
  const chossenQuestion = useSelector(
    (state) => state.questions.chossenQuestion
  );
  const dispatch = useDispatch();
  function handleSelect(question) {
    dispatch(setChossenQuestion(question));
  }
  useEffect(() => {
    setQuestionsUi(
      questionsList.map((question) => {
        return (
          <Card>
            <CardContent>
              <Typography
                color="Highlight"
                gutterBottom
                fontWeight={"800"}
                fontFamily={"Varela Round"}
              >
                {question.title}
              </Typography>
              <Typography>{question.description}</Typography>
            </CardContent>
            <CardActions>
              <Link to={`codeBlock/${question.id}`}>
                <Button
                  className="startButton"
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    handleSelect(question);
                  }}
                >
                  let's start coding
                </Button>
              </Link>
            </CardActions>
          </Card>
        );
      })
    );
  }, [questionsList]);

  return (
    <>
      <h1 className="title">Choose code block</h1>
      <div className="questionsContainer">{questionsUi}</div>;
    </>
  );
}
