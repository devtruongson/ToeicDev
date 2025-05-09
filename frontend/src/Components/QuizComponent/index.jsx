import "./styles.css";
import React from "react";
import { Image, Form, Container, Row, Col, Button } from "react-bootstrap";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function QuizComponent({ HandleNextQuestion, DataQuestion }) {
    // console.log(DataQuestion);
    const audioRef = useRef(null);
    const formRef = useRef(null);
    const [answerData, setAnswerData] = useState([]);
    const Answer = ({ questionID, answer, answerID }) => {
        return (
            <Form.Check
                type={"radio"}
                name={`group-${questionID}`}
                id={`answer-${questionID}-${answerID}`}
                label={answer}
            />
        );
    };
    const Question = ({
        questionID = "q1",
        questionText = "",
        answer = ["(A)", "(B)", "(C)", "(D)"],
    }) => {
        return (
            <Form.Group
                controlId={questionID}
                key={`default-radio`}
                className="mb-3"
            >
                <Form.Label className="question-text">
                    {questionText}
                </Form.Label>
                {answer.map((item, index) => {
                    return (
                        <Form.Check
                            type={"radio"}
                            name={`group-${questionID}`}
                            id={`answer-${questionID}-${index + 1}`}
                            label={item}
                        />
                        // <Answer
                        //   key={index + 1}
                        //   questionID={questionID}
                        //   answer={item}
                        //   answerID={index + 1}
                        // />
                    );
                })}
            </Form.Group>
        );
    };

    const handleSubmit = () => {
        // console.log(answerData);
        event.preventDefault();
        audioRef.current?.pause();
        HandleNextQuestion(answerData);
    };
    const handleChange = (event) => {
        setAnswerData([
            ...answerData,
            { questionId: event.target.name, choice: event.target.value },
        ]);
    };
    const [controlAudio, setControlAudio] = useState("auto");
    const onplay = () => {
        audioRef.current.play();
        setControlAudio(false);
        console.log("aaaaaaa");
    };

    const [volumeInput, setVolumeInput] = useState(1);
    useEffect(() => {
        if (audioRef.current == null) return;
        audioRef.current.volume = volumeInput;
    }, [volumeInput]);
    return (
        <>
            {/* <h1>About</h1> */}
            <Container className="quiz">
                {/* <b>Câu {DataQuestion.newOrder} : </b> */}
                <Row className="datum">
                    {DataQuestion.audio ? (
                        <Row className="justify-content-md-center">
                            <Button onClick={onplay}>Play</Button>
                            <Col md="auto">
                                <audio
                                    // onPlay={onplay}
                                    ref={audioRef}
                                    style={{ pointerEvents: "none" }}
                                    controls
                                >
                                    <source
                                        src={DataQuestion.audio}
                                        type="audio/mpeg"
                                    />
                                </audio>
                                <br />
                            </Col>
                        </Row>
                    ) : null}
                    {DataQuestion.image ? (
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Image
                                    width="350"
                                    height="300"
                                    src={DataQuestion.image}
                                    alt="Default Image"
                                    // objectFit="cover"
                                />
                            </Col>
                        </Row>
                    ) : null}
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: DataQuestion.paragraph,
                                }}
                                className="paragraph"
                            ></p>
                        </Col>
                    </Row>
                </Row>
                <Row className="list-question">
                    <Form onSubmit={handleSubmit}>
                        {DataQuestion.questionList.map((item, index) => {
                            return (
                                <Form.Group
                                    ref={formRef}
                                    controlId={`${DataQuestion.id}-${item.id}`}
                                    key={`${DataQuestion.id}-${item.id}`}
                                    className="mb-3"
                                >
                                    <b>Câu {DataQuestion.newOrder + index} :</b>
                                    <Form.Label className="question-text">
                                        {item.question}
                                    </Form.Label>
                                    {item.answer.map((itemAnswer, index) => {
                                        return (
                                            <Form.Check
                                                key={`answer-${item.id}-${
                                                    index + 1
                                                }`}
                                                type={"radio"}
                                                name={`${item.id}`}
                                                value={itemAnswer}
                                                id={`answer-${item.id}-${
                                                    index + 1
                                                }`}
                                                onChange={handleChange}
                                                label={itemAnswer}
                                            />
                                        );
                                    })}
                                </Form.Group>
                            );
                        })}

                        <div className="form-submit">
                            <Button
                                className="submit-button"
                                variant="primary"
                                type="submit"
                            >
                                Next
                            </Button>
                        </div>
                    </Form>
                </Row>
            </Container>
        </>
    );
}

export default QuizComponent;
