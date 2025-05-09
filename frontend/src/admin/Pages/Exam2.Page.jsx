import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/TextInput.component";
import { API_BASE_URL } from "../../Constraint/api";
import "./Exam2.Page.css";

function ExamPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [Name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const history = useHistory();

    const HandleInsertExam = () => {
        axios
            .post(
                API_BASE_URL + "api/exam",
                JSON.stringify({ Name, description }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                if (response.status != 200) {
                    return;
                }

                history.push(`/edit/${response.data.exam.id}`, {
                    exam: response.data.exam,
                });
                console.log(response.data.exam);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const HandleEditExam = (id, exam) => {
        if (!id) {
            return;
        }

        history.push(`/edit/${id}`, { exam: exam });
    };
    const HandleDeleteExam = (id) => {
        setLoading(true);
        axios
            .delete(API_BASE_URL + "api/exam/" + id, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(function (response) {
                console.log(response.data);
                fetchData();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: response } = await axios.get(
                API_BASE_URL + "api/exam/all"
            );
            setData(response);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const RowExam = ({ exam }) => {
        if (!exam) {
            return <tr></tr>;
        }

        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
            <tr>
                <td>{exam.id}</td>
                <td>
                    <a>{exam.Name}</a>
                </td>
                <td>{exam.description}</td>

                <td className="project-state">
                    {exam.ltype}-{exam.type}
                </td>
                <td className="project-actions text-right">
                    <button
                        onClick={() => HandleEditExam(exam.id, exam)}
                        className="btn btn-info btn-sm mx-1"
                        href="#"
                    >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                    </button>
                    <button
                        onClick={() => handleShow()}
                        className="btn btn-danger btn-sm mx-1"
                        href="#"
                    >
                        <i className="fas fa-trash"></i>
                        Delete
                    </button>
                </td>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn có chắc chắn xoá bài thi thử "{exam.Name}" không?
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="btn btn-sm mx-1"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-danger btn-sm mx-1"
                            variant="primary"
                            onClick={() => {
                                HandleDeleteExam(exam.id);
                                handleClose;
                            }}
                        >
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            </tr>
        );
    };

    return (
        <div className="wrapper">
            <div className="content-wrappers">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Quản lý đề thi</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Exam
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Danh sách đề thi thử</h3>

                            <div className="card-tools">
                                <button
                                    onClick={handleShow}
                                    className="btn btn-success btn-sm"
                                >
                                    <i className="fas fa-trash"></i>
                                    Thêm đề thi
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="collapse"
                                    title="Collapse"
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-tool"
                                    data-card-widget="remove"
                                    title="Remove"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%" }}>ID</th>
                                        <th style={{ width: "20%" }}>Name</th>
                                        <th style={{ width: "20%" }}>
                                            Description
                                        </th>
                                        <th
                                            style={{ width: "18%" }}
                                            className="text-center"
                                        >
                                            Type
                                        </th>
                                        <th
                                            style={{ width: "20%" }}
                                            className="text-center"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data
                                        ? data.map((item, index) => {
                                              return (
                                                  <RowExam
                                                      key={index}
                                                      exam={item}
                                                  />
                                              );
                                          })
                                        : null}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            dialogClassName="modal-xl"
                            show={show}
                            onHide={handleClose}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Thêm bài thi</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <label>Tên bài thi :</label>
                                <TextInput
                                    valueProps={""}
                                    setTextProps={(newContent) => {
                                        setName(newContent);
                                    }}
                                />
                                <label>Mô tả :</label>
                                <TextInput
                                    valueProps={""}
                                    setTextProps={(newContent) => {
                                        setDescription(newContent);
                                    }}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    className="btn btn-danger btn-sm mx-1"
                                    onClick={handleClose}
                                >
                                    Huỷ
                                </button>
                                <button
                                    className="btn btn-success btn-sm mx-1"
                                    onClick={HandleInsertExam}
                                >
                                    Thêm
                                </button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </section>
            </div>

            <aside className="control-sidebar control-sidebar-dark"></aside>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : null}
        </div>
    );
}

export default ExamPage;
