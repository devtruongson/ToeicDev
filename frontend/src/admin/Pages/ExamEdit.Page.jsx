import React, { useState, useEffect ,useRef } from "react";
import { Col, Button, Collapse, Container, Modal, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TableComponent from "../components/table.component";
import TextInput from "../components/TextInput.component";
import JoditEditor from "jodit-react";
import { API_BASE_URL } from "../../Constraint/api";

// import Button from 'react-bootstrap/Button';
import Axios from "axios";
import QuizComponent2 from "../components/quiz.component";
function ExamEditPage(props) {
  
  const [loading, setLoading] = useState(false);
  //   const searchParams = useParams();
  const exam2 = props.history.location.state?.exam;
  const [exam, setExam] = useState(exam2);
  // console.log(exam);
  const [Name, setName] = useState(exam?.Name);
  const [description, setDescription] = useState(exam?.description);
  //   console.log(props.history.location.state.exam);

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await Axios.get(
          API_BASE_URL + "api/exam/"+exam._id
        );
        console.log("res",response);
        setExam(response[0]);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);
const HandleUpdateData=()=>{
  fetchData()
}

  const UpdateMetadataExam = () => {
    // const insertData = async () => {
    // setLoading(true);
    Axios
      .post(
        API_BASE_URL + "api/exam/"+exam._id,
        JSON.stringify({Name,description}),
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
        fetchData();
        // console.log(response);
        console.log(response.data.exam);
        // setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    // };
  };

  

////////////////////////add question /////////////////////////////


const HandleAnswerChange = ({ type, input }) => {
  // console.log(audio);
  if (!input) {
      return;
  }
  const temp = previewContent;
  if(!temp.answer.texts || !temp.answer.choices){
      return
  }
  if (temp.hasChild) {
      switch (type) {
          case "question":
              temp.childCard[input.index].question.text = input.text;
              break;
          case "answer":
              const answerText = input.text?.split(";");
              if (!answerText) {
                  return;
              }
              temp.childCard[input.index].answer.texts = [answerText.shift()]
              temp.childCard[input.index].answer.choices = answerText;
              break;
          case "hint":
              temp.childCard[input.index].answer.hint = input.text;
              break;
          default:
              break;
      }
  } else {

      switch (type) {
          case "hint":
              temp.answer.hint = input.text;
              break;
          case "answer":
              const answerText = input.text?.split(";");
              if (!answerText) {
                  return;
              }
              temp.answer.texts = [answerText.shift()]
              temp.answer.choices = answerText;
          default:
              break;
      }
  }
  setPreviewContent(temp);
  setIsChange(!isChange)
}
const config =
{
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    placeholder: 'Start typings...',
    maxHeight: 399,
    enter: "BR",
}

const editor = useRef(null);
  const [show, setShow] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isChange2, setIsChange2] = useState(false);

  const InitialValue = {
    hasChild: 0,
    parentId: exam?._id,
    question: {
        text: "",
        image: "",
        sound: "",
        hint: ""
    }
    ,
    answer: {
        texts: [""],
        choices: [""],
        image: "",
        sound: "",
        hint: ""
    }
    ,
    tags: [],
    type: 1,
    orderIndex: 0
}
const [previewContent, setPreviewContent] = useState(InitialValue);
  const handleClose = () => {
      console.log('aa');
      setPreviewContent(InitialValue);
      setIsChange(!isChange)
      setIsChange2(!isChange)
      setShow(false);
  }
  const HandleAddAnswer = () => {
      const newAnswer = InitialValue;
      const temp = previewContent;
      temp.childCard = [...temp.childCard, newAnswer]
      setPreviewContent(temp);
      console.log(previewContent);
      setIsChange(!isChange)
  }
  const handleShow = () => setShow(true);

  const HandleUpdate = () => {
    console.log("update");
    setLoading(true);
    console.log(previewContent);
    const {_id,...temp}=previewContent
    console.log('id',_id,'temp',temp);
    Axios
      .post(
        API_BASE_URL + "api/question/",
        JSON.stringify(temp),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        fetchData();
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
      setIsChange2(!isChange2)
};
const setContent = ({ type, input }) => {
    // console.log(audio);
    // if (!input) {
    //     return;
    // }
    const temp = previewContent;
    if (type == 'OrderIndex') {
        temp.newOrder = parseInt(input);
    }
    type == "hasChild"
        ? temp.hasChild = input.hasChild ? 1 : 0
        : temp.question[type] = input
    //     temp.question.sound = input.audio ;
    //     temp.question.image = input.image ;
    // }
    // temp.hasChild = input.hasChild;
    setPreviewContent(temp);
    setIsChange(!isChange)
}

const handleChangeType = (type) => {
    const temp = previewContent;
    temp.type = type
    setPreviewContent(temp);
    // console.log(temp);
    setIsChange(!isChange)
}


  

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
                  <li className="breadcrumb-item active">Edit Exam</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Thông tin về bài thi</h3>

              <div className="card-tools">
                <button 
                className="btn btn-success btn-sm"
                onClick={UpdateMetadataExam}
                >
                  <i className="fas fa-trash"></i>
                  Cập nhật mô tả
                </button>
              </div>
            </div>
            <div style={{ margin: 10 }} className="card-body p-0">
              <label>Tên Bài thi:</label>
              <TextInput 
              valueProps={exam?.Name} 
              setTextProps={setName}
              />
              <label>Giới thiệu:</label>
              <TextInput 
              valueProps={exam?.description} 
              setTextProps={setDescription}/>
              {/* <QuizComponent2 DataQuestion={exam.question[100]} /> */}
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Danh sách câu hỏi của đề thi</h3>

              <div className="card-tools">
                <button 
                className="btn btn-success btn-sm"
                onClick={()=>{handleShow()}}
                // onClick={AddQuestion}
                >
                  <i className="fas fa-trash"></i>
                  Thêm câu hỏi
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
              <TableComponent exam={exam} isChange={isChange2} HandleUpdateData={HandleUpdateData} />
              {/* <QuizComponent2 DataQuestion={exam.question[100]} /> */}
            </div>
          </div>
        </section>
      </div>
      
      <Modal dialogClassName="modal-xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa câu hỏi
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>

                        <Row>
                            <Col xs={5}><QuizComponent2 isChange={isChange} DataQuestion={previewContent} /></Col>
                            <Col xs={6}>
                                <label>Vị trí :</label>
                                <TextInput
                                    valueProps={previewContent.newOrder}
                                    setTextProps={(newContent) => {
                                        setContent({ type: 'OrderIndex', input: newContent })
                                    }}
                                />
                                <label>Link Audio :</label>
                                <TextInput
                                    valueProps={previewContent.question.sound}
                                    setTextProps={(newContent) => {
                                        setContent({ type: 'sound', input: newContent })
                                    }}
                                />
                                <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, 'sound')} id="exampleInputFile" />
                                <button
                                    className="btn btn-primary btn-sm mx-1"
                                    style={{minWidth:100,minHeight:30}}
                                    onClick={() => {
                                        handleUpload('sound');
                                    }}
                                >{loading?<div className="mini-spinner"></div>:'Upload Sound'}
                                    
                                </button>
                                <button
                                    className="btn btn-danger btn-sm mx-1"
                                    style={{minWidth:100,minHeight:30}}
                                    onClick={() => {
                                        setContent({ type: 'image', input: '' })
                                        setIsChange(!isChange)
                                        // setFile(null)
                                    }}
                                >
                                    Remove Sound
                                </button>
                                <br />
                                <label>Link Ảnh :</label>
                                <TextInput
                                    valueProps={previewContent.question.image}
                                    setTextProps={(newContent) => {
                                        setContent({ type: 'image', input: newContent })
                                    }}
                                />
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} id="exampleInputFile" />
                                <button
                                    className="btn btn-primary btn-sm mx-1"
                                    style={{minWidth:100,minHeight:30}}
                                    onClick={() => {
                                        handleUpload('image');
                                    }}
                                >{loading?<div className="mini-spinner"></div>:'Upload Image'}
                                    
                                </button>
                                <button
                                style={{minWidth:100,minHeight:30}}
                                    className="btn btn-danger btn-sm mx-1"
                                    onClick={() => {
                                        setContent({ type: 'image', input: '' })
                                        setIsChange(!isChange)
                                        // setFile(null)
                                    }}
                                >
                                    Remove Image
                                </button>
                                <br />
                                <label>Câu hỏi :</label>
                                <JoditEditor
                                    ref={editor}
                                    value={previewContent.question.text}
                                    config={config}
                                    style={{ maxHeight: 400 }}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => setContent({ type: 'text', input: newContent })} // preferred to use only this option to update the content for performance reasons
                                    onChange={newContent => { }}
                                />
                                <label>Loại câu hỏi</label>
                                <select value={previewContent.type}
                                    onChange={(e) => { handleChangeType(e.target.value) }}
                                    className="form-control select2"
                                >

                                    <option value={'t1'}>Part 1 : listen 1</option>
                                    <option value={'t2'}>Part 2 : listen 2</option>
                                    <option value={'t3'}>Part 3 : listen 3</option>
                                    <option value={'t4'}>Part 4 : listen 4</option>
                                    <option value={'t5'}>Part 5 : reading 1</option>
                                    <option value={'t6'}>Part 6 : reading 2</option>
                                    <option value={'t7'}>Part 7 : reading 3</option>
                                </select>
                                <div style={{ marginTop: 10 }} className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        checked={previewContent.hasChild}
                                        onChange={(e) => setContent({ type: "hasChild", input: { hasChild: e.target.checked } })}
                                    />
                                    <label className="form-check-label">Has Child</label>
                                </div>
                                {!previewContent.hasChild
                                    ? <>
                                        <label>Đáp án:</label>
                                        <sub className="text-danger"> Lưu ý: Các đáp án phân tách nhau bởi dấu chấm phảy ';' và bao gồm cả (A)</sub>
                                        <br />
                                        <sub className="text-danger">Đáp án đúng đặt ở đầu tiên </sub>
                                        <br />
                                        <TextInput
                                            setTextProps={(newContent) => HandleAnswerChange({ type: "answer", input: { text: newContent } })}
                                            valueProps={[...previewContent.answer?.texts, ...previewContent.answer?.choices].join(";")}
                                        />
                                        <label>Hint:</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={previewContent.answer?.hint}
                                            config={config}
                                            style={{ maxHeight: 400 }}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => HandleAnswerChange({ type: 'hint', input: { text: newContent } })} // preferred to use only this option to update the content for performance reasons
                                            onChange={newContent => { }}
                                        />
                                    </>
                                    : <Col>
                                        <sub className="text-danger"> Lưu ý: Các đáp án phân tách nhau bởi dấu chấm phảy ';' và bao gồm cả (A)</sub>
                                        <br />
                                        <sub className="text-danger">Đáp án đúng đặt ở đầu tiên </sub>
                                        <br />
                                        {previewContent.childCard?.map((item, index) => {
                                            return (<>
                                                <label style={{ marginTop: 30 }}>Câu hỏi {index + 1} :</label>
                                                <TextInput
                                                    setTextProps={
                                                        (newContent) => HandleAnswerChange({ type: "question", input: { index: index, text: newContent } })
                                                    }
                                                    valueProps={item.question.text}
                                                />
                                                <label>Đáp án:</label>
                                                <TextInput
                                                    setTextProps={(newContent) => HandleAnswerChange({ type: "answer", input: { index: index, text: newContent } })}
                                                    valueProps={[...item.answer?.texts, ...item.answer?.choices].join(";")}
                                                />
                                                <label>Hint:</label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={item.answer?.hint}
                                                    config={config}
                                                    style={{ maxHeight: 400 }}
                                                    tabIndex={1} // tabIndex of textarea
                                                    onBlur={newContent => HandleAnswerChange({ type: 'hint', input: { index: index, text: newContent } })} // preferred to use only this option to update the content for performance reasons
                                                    onChange={newContent => { }}
                                                />
                                            </>
                                            )
                                        })
                                        }
                                        <Button
                                            onClick={() => HandleAddAnswer()}
                                            variant="success"
                                            className="btn btn-sm mx-1 " >
                                            Thêm câu hỏi phụ
                                        </Button>
                                    </Col>
                                }
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger btn-sm mx-1" onClick={handleClose}>
                        Cancel
                    </button>
                    <Button onClick={HandleUpdate} variant="success" className="btn btn-sm mx-1 " >Thêm mới</Button>
                </Modal.Footer>
            </Modal>

      <footer className="main-footer">
        <div className="float-right d-none d-sm-block">
          {/* <b>Version</b> 3.2.0 */}
        </div>
        <strong>
          {/* Copyright &copy; 2014-2021{" "} */}
          {/* <a href="https://adminlte.io">AdminLTE.io</a>. */}
        </strong>{" "}
        {/* All rights reserved. */}
      </footer>

      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
}

export default ExamEditPage;
