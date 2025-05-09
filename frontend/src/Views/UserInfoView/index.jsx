import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import "./styles.css";
import axios from "axios";
import useToken from "../../Helper/useToken";
import { API_BASE_URL } from "../../Constraint/api";
import ResultView from "../ResultView";
import Modal from "react-bootstrap/Modal";

const UserInfo = () => {
    const [scoreData, setScoreData] = useState({});
    const [examData, setExamData] = useState({});
    const [isShowResult, setIsShowResult] = useState(false);

    const { token, setToken } = useToken();
    const [user, setUser] = useState({
        firstName: "Tống Đạt",
        lastName: "",
        email: "tmd22121999@gmail.com",
        occupation: "",
    });
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleClose = () => {
        setIsShowResult(false);
    };

    const showResult = (resultID) => {
        const resultData = data[0].histories.find(
            (item) => item._id == resultID
        );
        setExamData(resultData.exam);
        setScoreData(resultData);
        setIsShowResult(true);
        console.log(resultData);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: response } = await axios.get(
                API_BASE_URL + "api/user",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": token,
                    },
                }
            );
            setData(response);
            const resultData = response[0].histories.find(
                (item) => item._id == resultID
            );
            setExamData(resultData.exam);
            setScoreData(resultData);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout title="User Infor">
            <div>
                <h1>Thông tin người dùng</h1>
                <form>
                    <div>
                        <label htmlFor="firstName">Họ Tên:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Họ và tên"
                            value={data[0]?.name}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={data[0]?.email}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                </form>
            </div>
            <div class="contentWrapper">
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Lịch sử thi toeic :</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <Modal
                    dialogClassName="modal-xl"
                    show={isShowResult}
                    onHide={handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết lịch sử thi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ResultView
                            userData={null}
                            examData={examData}
                            scoreData={scoreData}
                        />
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header"></div>
                                    <div class="card-body">
                                        <table
                                            id="example2"
                                            class="table table-bordered table-hover"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Id Bài thi</th>
                                                    <th>Điểm nghe</th>
                                                    <th>Điểm đọc</th>
                                                    <th>Tổng điểm</th>
                                                    <th>Thời gian làm bài</th>
                                                    <th>Ngày làm bài</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data[0]?.histories?.map(
                                                    (item) => {
                                                        return (
                                                            <tr
                                                                onClick={() => {
                                                                    showResult(
                                                                        item._id
                                                                    );
                                                                }}
                                                            >
                                                                <td>
                                                                    {
                                                                        item.examId
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item
                                                                            .score
                                                                            .listening
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item
                                                                            .score
                                                                            .reading
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {" "}
                                                                    {item.score
                                                                        .reading +
                                                                        item
                                                                            .score
                                                                            .listening}
                                                                </td>
                                                                <td>
                                                                    {toHoursAndMinutes(
                                                                        item.time
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {new Date(
                                                                        item.created_at
                                                                    ).toLocaleString()}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Id Bài thi</th>
                                                    <th>Điểm nghe</th>
                                                    <th>Điểm đọc</th>
                                                    <th>Tổng điểm</th>
                                                    <th>Thời gian làm bài</th>
                                                    <th>Ngày làm bài</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : null}
        </Layout>
    );
};

export default UserInfo;
function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return (
        "" +
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)
    );
    // return { h: hours, m: minutes, s: seconds };
}
