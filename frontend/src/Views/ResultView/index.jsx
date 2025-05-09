import React from "react";
import { useState } from "react";
import Layout from "../../Layout";
import "./styles.css";
import QuizComponent from "../../Components/QuizComponent/quiz.component";
import { Button, Card, Container, Row, Col, Collapse } from "react-bootstrap";
// import { Grid, Card, Text } from "@nextui-org/react";
import { useTimer } from "react-timer-hook";
// import data from "../../test/dataTest.json";
import { useRef } from "react";
import { database } from "faker/lib/locales/en";

export const CollapseComponent = ({ data , userData }) => {
  const [open, setOpen] = useState(false);
  let _variant = "primary";
  const userAnswer = userData?.filter((item) => item.questionId == data._id);
  // console.log(userAnswer);
  if (!userAnswer.length > 0) {
    _variant = "secondary";
  } else {
    if (userAnswer[0].choice == data.answer.texts[0]) _variant = "success";
    else _variant = "danger";
  }
  // console.log(userAnswer.value + "-" + data.correctAnswer);
  return (
    <>
      <Button
        style={{width:320,margin:10}}
        variant={_variant}
        onClick={() => setOpen(!open)}
        aria-controls={data.id}
        aria-expanded={open}
      >
        Câu {data.newOrder} {data.hasChild == 1 ? "- "+(data.newOrder+data.childCard.length-1):""}  (Click để xem chi tiết)
      </Button>
      <Collapse in={open}>
        <div id={data.id}>
          <QuizComponent userAnswer={userAnswer.length > 0?userAnswer[0].choice:null} DataQuestion={data} />
          {/* <p dangerouslySetInnerHTML={{ __html: data.hint }}></p> */}
        </div>
      </Collapse>
    </>
  );
};

function ResultView({ userData,examData,scoreData }) {
  const QuestionData = examData[0].question.flatMap((item) => {
    if(item.hasChild){
      return([...item.childCard])
    }
    return(item);
  })
  return (
    // <Layout>
    //   <div className="Home">
    <Container className="Container">
      {/* <h1 className="HeadingText">{"Test"}</h1> */}

      <Row style={{ marginTop: 100 }}>
        <Col></Col>
        <Col md={"auto"}>
          <b>Bài thi:</b> {examData[0].Name}
          <br/>
          <b>Tổng điểm đạt được :</b> {scoreData.score.listening+scoreData.score.reading} 
          <br/>
          <b>Điểm đọc :</b> {scoreData.score.reading}; <b>Điểm nghe :</b> {scoreData.score.listening}
          <br/>
          <b>Thời gian hoàn thành bài thi :</b> {secondsToHms(scoreData.time)}
        </Col>
        <Col></Col>
      </Row>
          <b>Đáp án :</b>
      <Row>
        {QuestionData.map((item, index) => {
          return (
            <div key={item.id} className={`topic`}>
              <CollapseComponent data={item} userData={scoreData.answers} />
            </div>
          );
        })}
      </Row>
      <Row style={{ marginTop: 100 }}>
        <Col></Col>
        <Col md={"auto"}></Col>
        <Col></Col>
      </Row>
    </Container>
    //   </div>
    // </Layout>
  );
}

export default ResultView;

const secondsToHms=(d)=> {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + " tiếng " : "";
  var mDisplay = m > 0 ? m + " phút " : "";
  var sDisplay = s > 0 ? s + " giây " : "";
  return hDisplay + mDisplay + sDisplay; 
}