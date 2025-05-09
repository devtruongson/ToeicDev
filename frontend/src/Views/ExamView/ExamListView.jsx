import { useState, useEffect } from "react";
import Layout from "../../Layout";
import "./styles.css";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useTimer } from "react-timer-hook";
import LoginView from "../AuthView/LoginView";
import useToken from "../../Helper/useToken";
import axios from "axios";
import { API_BASE_URL } from "../../Constraint/api";
import { Link, useHistory } from "react-router-dom";

function ExamListView() {
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
        onExpire: () => console.warn("onExpire called"),
    });
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: response } = await axios.get(
                API_BASE_URL + "api/exam/all"
            );
            setData(response);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const HandleStart = (exam) => {
        history.push(`/examTest/${exam._id}`, {
            exam: "exam",
        });
    };

    const TestInforCard = ({ exam }) => {
        return (
            <Col md={4} sm={6} xs={12} className="exam-card-container">
                <div className="exam-card">
                    <div className="exam-card-content">
                        <div className="exam-card-image">
                            <img
                                src="https://vietmybinhduong.edu.vn/wp-content/uploads/2022/08/t1.jpg"
                                alt={`${exam.Name} cover`}
                            />
                        </div>
                        <h3 className="exam-card-title">{exam.Name}</h3>
                        <div className="exam-card-details">
                            <div className="exam-detail">
                                <span className="exam-detail-icon">⏱️</span>
                                <span>120 phút</span>
                            </div>
                            <div className="exam-detail">
                                <span className="exam-detail-icon">📝</span>
                                <span>100 câu hỏi</span>
                            </div>
                        </div>
                        <div className="exam-action">
                            <button
                                className="start-exam-btn"
                                onClick={() => HandleStart(exam)}
                            >
                                Bắt đầu thi thử
                            </button>
                        </div>
                    </div>
                </div>
            </Col>
        );
    };

    if (!token) {
        return (
            <Layout>
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-illustration">
                            <img
                                src="/images/login-illustration.svg"
                                alt="Login"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://vietmybinhduong.edu.vn/wp-content/uploads/2022/08/t1.jpg";
                                }}
                            />
                        </div>
                        <h2>Đăng nhập để làm bài thi thử TOEIC</h2>
                        <p className="login-message">
                            Vui lòng đăng nhập hoặc đăng ký tài khoản để bắt đầu
                            làm bài thi
                        </p>
                        <div className="login-actions">
                            <Link to="/Login" className="login-btn">
                                Đăng nhập
                            </Link>
                            <Link to="/Register" className="register-btn">
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="exam-list-header">
                <div className="container">
                    <h1>Danh sách bài thi TOEIC</h1>
                    <p>
                        Chọn bài thi để luyện tập và cải thiện kỹ năng tiếng Anh
                        của bạn
                    </p>
                </div>
            </div>

            <div className="exam-list-section">
                <Container>
                    <Row className="exam-list">
                        {data
                            .sort((a, b) => {
                                if (a._id.toLowerCase() < b._id.toLowerCase())
                                    return -1;
                                if (a._id.toLowerCase() > b._id.toLowerCase())
                                    return 1;
                                return 0;
                            })
                            .map((item) => (
                                <TestInforCard key={item._id} exam={item} />
                            ))}
                    </Row>
                </Container>
            </div>

            {loading && (
                <div className="loader-container">
                    <div className="loader">
                        <div className="spinner"></div>
                        <p>Đang tải...</p>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default ExamListView;
