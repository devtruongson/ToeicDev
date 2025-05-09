import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../Layout";
import "./styles.css";
import QuizComponent from "../../Components/QuizComponent";
import { Button, Card, Container, Row, Col, Pagination } from "react-bootstrap";
// import { Grid, Card, Text } from "@nextui-org/react";
import { useTimer } from "react-timer-hook";
// import data from "../../test/dataTest.json";
import { useRef } from "react";
import ResultView from "../ResultView";
import useToken from "../../Helper/useToken";
import LoginView from "../AuthView/LoginView";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../Constraint/api";

function ExamView(props) {
    const { id } = useParams();
    const { token, setToken } = useToken();
    let expiryTimestamp = new Date().setHours(new Date().getHours() + 2);
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        autoStart: false,
        expiryTimestamp,
        onExpire: () => {
            SaveUserData(saveAnswer.current);
            console.warn("onExpire called");
        },
    });

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const [scoreData, setScoreData] = useState({});

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: response } = await axios.get(
                API_BASE_URL + "api/exam/all"
            );
            setData(response.filter((item) => item.id == id));
            setDataOrder(
                response.filter((item) => item.id == id)[0].question ||
                    [].sort((a, b) => a.newOrder - b.newOrder)
            );
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
        HandleStart();
    };
    // console.log(data);
    useEffect(() => {
        fetchData();
    }, []);

    const SaveUserData = (answer) => {
        // const insertData = async () => {
        console.log(answer);
        setLoading(true);
        axios
            .post(
                API_BASE_URL + "api/history/",
                JSON.stringify({
                    examId: data[0].id,
                    answers: answer,
                    time: 7200 - (hours * 60 * 60 + minutes * 60 + seconds),
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": token,
                    },
                }
            )
            .then(function (response) {
                if (response.status != 200) {
                    return;
                }
                setScoreData(response.data);
                setIsEnd(true);
                setIsStart(false);
                console.log(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        // };
    };

    const [activeTopic, setActiveTopic] = React.useState(0);
    const [isEnd, setIsEnd] = React.useState(false);
    const dataProcess = (data) => {
        // console.log("item", data);
        const data1 = data;
        const data2 = (data[0]?.question || []).map((item, index) => {
            // console.log("it", item);
            var questionList;
            // console.log("item", item);
            if (item.hasChild == 1) {
                const temp = item?.childCard || [];
                questionList = temp.map((item2) => {
                    const questionListReturn = {
                        id: item2.id,
                        question: item2.question.text,
                        answer: [
                            ...item2.answer.texts,
                            ...item2.answer.choices,
                        ].sort((a, b) =>
                            b.slice(0, 3) < a.slice(0, 3) ? 1 : -1
                        ),
                        correctAnswer: item2.answer.texts[0],
                    };
                    return questionListReturn;
                });
            } else {
                // console.log("ql", questionList);
                questionList = [
                    {
                        id: item.id,
                        question: item.question.text,
                        answer: [
                            ...item.answer.texts,
                            ...item.answer.choices,
                        ].sort((a, b) =>
                            b.slice(0, 3) < a.slice(0, 3) ? 1 : -1
                        ),
                        correctAnswer: item.answer.texts[0],
                        hint: item.answer.hint,
                    },
                ];
            }
            const itemReturn = {
                id: item.id,
                audio: item.question.sound ? item.question.sound : null,
                image: item.question.image
                    ? `${item.question.image}`
                    : // ? `https://storage.googleapis.com/${item.question.image}`
                      "",
                paragraph: item.question.text,
                questionList: questionList,
                newOrder: item.newOrder,
            };
            return itemReturn;
        });
        return data2;
    };
    // console.log(dataProcess(data).flatMap((item) => item.questionList));

    const [isStart, setIsStart] = React.useState(false);
    const HandleStart = () => {
        start();
        setIsStart(!isStart);
    };

    const saveAnswer = useRef([]);

    const HandleNextQuestion = (answerData) => {
        saveAnswer.current = [...saveAnswer.current, ...answerData];
        if (activeTopic + 1 === data[0].question.length) {
            SaveUserData(saveAnswer.current);
            console.log(saveAnswer.current);
            return;
        }
        setActiveTopic(activeTopic + 1);
    };
    const TestInforCard = () => {
        return (
            <Row>
                <Col></Col>

                <Col>
                    <Card
                        className="text-center"
                        style={{
                            width: "20rem",
                            padding: "2rem",
                            backgroundColor: "#ebd081",
                        }}
                    >
                        <Card.Img
                            variant="top"
                            src="https://vietmybinhduong.edu.vn/wp-content/uploads/2022/08/t1.jpg"
                        />
                        <Card.Body>
                            <Card.Title>Bài thi thử Toeic :</Card.Title>
                            <Card.Text>
                                Số lượng câu hỏi : 100 câu <br />
                                Thời gian làm bài thi : 120 phút <br />
                            </Card.Text>
                            <Button
                                style={
                                    isStart
                                        ? { display: "none" }
                                        : { display: "inline-block" }
                                }
                                className="button"
                                variant="primary"
                                onClick={HandleStart}
                            >
                                Bắt đầu thi thử
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        );
    };
    if (!token) {
        return (
            <Layout>
                <Row>
                    <Col></Col>
                    <Col>
                        <Row>
                            <h2>Yêu cầu đăng nhập để làm bài thi thử Toeic</h2>
                        </Row>
                        <Row>
                            <Button
                                style={{
                                    display: "inline-block",
                                    margin: "auto",
                                }}
                                className="button"
                                variant="primary"
                                // onClick={HandleStart}
                            >
                                <NavLink
                                    className={"button-text"}
                                    exact
                                    to={"/Login"}
                                >
                                    Ấn vào đây để đi đến trang đăng nhập
                                </NavLink>
                            </Button>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
            </Layout>
        );
    }
    return (
        <Layout>
            <div className="Home">
                <Container className="Container">
                    {/* <h1 className="HeadingText">{"Test"}</h1> */}
                    {isStart ? (
                        <>
                            <Row>
                                <Col></Col>
                                <Col></Col>
                                <Col>
                                    <p className="time-text float-right">
                                        {hours < 10 ? "0" + hours : hours}:
                                        {minutes < 10 ? "0" + minutes : minutes}
                                        :
                                        {seconds < 10 ? "0" + seconds : seconds}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                {dataProcess(data) ||
                                    []
                                        .sort((a, b) => a.newOrder - b.newOrder)
                                        .map((item, index) => {
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`topic ${
                                                        activeTopic === index
                                                            ? "Active"
                                                            : "Inactive"
                                                    }`}
                                                >
                                                    <QuizComponent
                                                        DataQuestion={item}
                                                        HandleNextQuestion={
                                                            HandleNextQuestion
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                            </Row>
                            <Row style={{ marginTop: 100 }}>
                                <Col></Col>
                                <Col md={"auto"}>
                                    <Pagination style={{ maxWidth: "450" }}>
                                        {/* <Pagination.First onClick={() => setActiveTopic(0)} />
                    <Pagination.Prev /> */}
                                        {activeTopic > 3 ? (
                                            <Pagination.Ellipsis />
                                        ) : null}
                                        {activeTopic > 2 ? (
                                            <Pagination.Item>
                                                {
                                                    dataOrder[activeTopic - 2]
                                                        .newOrder
                                                }
                                                {dataOrder[activeTopic - 2]
                                                    .hasChild
                                                    ? "-" +
                                                      (dataOrder[
                                                          activeTopic - 2
                                                      ].newOrder +
                                                          dataOrder[
                                                              activeTopic - 2
                                                          ].childCard.length -
                                                          1)
                                                    : ""}
                                            </Pagination.Item>
                                        ) : null}
                                        {activeTopic > 1 ? (
                                            <Pagination.Item>
                                                {
                                                    dataOrder[activeTopic - 1]
                                                        .newOrder
                                                }
                                                {dataOrder[activeTopic - 1]
                                                    .hasChild
                                                    ? "-" +
                                                      (dataOrder[
                                                          activeTopic - 1
                                                      ].newOrder +
                                                          dataOrder[
                                                              activeTopic - 1
                                                          ].childCard.length -
                                                          1)
                                                    : ""}
                                            </Pagination.Item>
                                        ) : null}
                                        <Pagination.Item active>
                                            {dataOrder[activeTopic]?.newOrder}
                                            {dataOrder[activeTopic]?.hasChild
                                                ? "-" +
                                                  (dataOrder[activeTopic]
                                                      .newOrder +
                                                      dataOrder[activeTopic]
                                                          .childCard.length -
                                                      1)
                                                : ""}
                                        </Pagination.Item>
                                        {activeTopic <
                                        dataProcess(data).length - 1 ? (
                                            <Pagination.Item>
                                                {
                                                    dataOrder[activeTopic + 1]
                                                        .newOrder
                                                }
                                                {dataOrder[activeTopic + 1]
                                                    .hasChild
                                                    ? "-" +
                                                      (dataOrder[
                                                          activeTopic + 1
                                                      ].newOrder +
                                                          dataOrder[
                                                              activeTopic + 1
                                                          ].childCard.length -
                                                          1)
                                                    : ""}
                                            </Pagination.Item>
                                        ) : null}
                                        {activeTopic <
                                        dataProcess(data).length - 2 ? (
                                            <Pagination.Item>
                                                {
                                                    dataOrder[activeTopic + 2]
                                                        .newOrder
                                                }
                                                {dataOrder[activeTopic + 2]
                                                    .hasChild
                                                    ? "-" +
                                                      (dataOrder[
                                                          activeTopic + 2
                                                      ].newOrder +
                                                          dataOrder[
                                                              activeTopic + 2
                                                          ].childCard.length -
                                                          1)
                                                    : ""}
                                            </Pagination.Item>
                                        ) : null}
                                        {activeTopic <
                                        dataProcess(data).length - 3 ? (
                                            <Pagination.Ellipsis />
                                        ) : null}
                                        {/* <Pagination.Next />
                    <Pagination.Last
                      onClick={() =>
                        setActiveTopic(dataProcess(data).length - 1)
                      }
                    /> */}
                                    </Pagination>
                                </Col>
                                <Col></Col>
                            </Row>
                        </>
                    ) : isEnd ? (
                        <ResultView
                            userData={saveAnswer.current}
                            examData={data}
                            scoreData={scoreData}
                        />
                    ) : (
                        <TestInforCard />
                    )}
                </Container>
            </div>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : null}
        </Layout>
    );
}

export default ExamView;
