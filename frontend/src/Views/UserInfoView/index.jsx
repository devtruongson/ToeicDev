import React, { useState,useEffect } from 'react';
import Layout from "../../Layout";
import './styles.css';
import axios from "axios";
import useToken from "../../Helper/useToken";
import { API_BASE_URL } from "../../Constraint/api";
import ResultView from "../ResultView";
import Modal from "react-bootstrap/Modal";

const UserInfo = () => {


  const [scoreData,setScoreData]=useState({});
  const [examData,setExamData]=useState({});
  const [isShowResult,setIsShowResult]=useState(false);

  const { token, setToken } = useToken();
  const [user, setUser] = useState({
    firstName: 'Tống Đạt',
    lastName: '',
    email: 'tmd22121999@gmail.com',
    occupation: ''
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  

  const handleClose = () => {
    setIsShowResult(false);
}

  const showResult = (resultID)=>{
    const resultData = data[0].histories.find((item)=>item._id==resultID)
    setExamData(resultData.exam)
    setScoreData(resultData)
    setIsShowResult(true)
    console.log(resultData);
  }


  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        API_BASE_URL + "api/user",
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token":token
          },
        }
      );
      setData(response);
      const resultData = response[0].histories.find((item)=>item._id==resultID)
      setExamData(resultData.exam)
      setScoreData(resultData)
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
        {/* <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div> */}
        <div   >
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
        {/* <div>
          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={user.occupation}
            onChange={handleChange}
          />
        </div> */}
        {/* <button type="submit">Submit</button> */}
      </form>
      {/* <h2>Preview</h2>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <p>Occupation: {user.occupation}</p> */}
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
    <Modal dialogClassName="modal-xl" show={isShowResult} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết lịch sử thi
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ResultView userData={null} examData={examData} scoreData = {scoreData}/>
                </Modal.Body>
                <Modal.Footer>
                    {/* <button className="btn btn-danger btn-sm mx-1" onClick={handleClose}>
                        Huỷ
                    </button> */}
                </Modal.Footer>
            </Modal>
    {/* {isShowResult?<ResultView userData={null} examData={examData} scoreData = {scoreData}/>:null} */}
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                {/* <h3 class="card-title">DataTable with minimal features & hover style</h3> */}
              </div>
              <div class="card-body">
                <table id="example2" class="table table-bordered table-hover">
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
                  {data[0]?.histories?.map((item)=>{
                    return(
                      <tr onClick={()=>{showResult(item._id)}}>
                        <td>{item.examId}</td>
                        <td>{item.score.listening}</td>
                        <td>{item.score.reading}</td>
                        <td> {item.score.reading+item.score.listening}</td>
                        <td>{toHoursAndMinutes(item.time)}</td>
                        <td>{new Date(item.created_at).toLocaleString()}</td>
                      </tr>
                    )
                  })}
                  {/* <tr>
                    <td>62b694aebbc57b27fe10f7ae</td>
                    <td>100</td>
                    <td>100</td>
                    <td> 200</td>
                    <td>1:20</td>
                    <td>20/01/2023</td>
                  </tr>
                  <tr>
                    <td>62b694aebbc57b27fe10f7ae</td>
                    <td>10</td>
                    <td>15</td>
                    <td> 25</td>
                    <td>0:03</td>
                    <td>20/01/2023</td>
                  </tr>
                  <tr>
                    <td>62b694aebbc57b27fe10f7ae</td>
                    <td>5</td>
                    <td>10</td>
                    <td> 15</td>
                    <td>0:01</td>
                    <td>20/01/2023</td>
                  </tr>*/}
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
      ) :null}
    </Layout>
  );
};

export default UserInfo;
function toHoursAndMinutes(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (""+(hours<10?"0"+hours:hours)+":"+(minutes<10?"0"+minutes:minutes) +":"+ (seconds<10?"0"+seconds:seconds));
  // return { h: hours, m: minutes, s: seconds };
}