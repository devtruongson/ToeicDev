import "./styles.css";
import React from "react";
import Layout from "../../Layout";
import { Button ,Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { Grid, Card, Text } from "@nextui-org/react";

function ToeicInforView() {
  return (
    <Layout title="Home">
      <Container className="Home">
      {/* <h1>Website thi thử TOEIC</h1> */}
        <div className="Container">
        <div id="banner" class="_10xtV"  data-reactid="125"><span class="_1raIJ" data-reactid="126"><h1 style={{ display: "inline-block" ,margin:20}}>Ôn luyện và thi thử TOEIC</h1></span><br data-reactid="129"></br><Button
            style={{ display: "inline-block",bottom:-200,position:"relative" ,margin:20,background:'#FE665E'}}
            className="button"
            // variant="primary"
            // onClick={HandleStart}
          >
            <NavLink className={"button-text"} exact to={"/Exam"}>
            Vào thi
            </NavLink>
          </Button></div>
          <h3 className="HeadingText">{"TOEIC là gì? "}</h3>
          <p className="DescriptionText">{"TOEIC (viết tắt của Test of English for International Communication - Bài kiểm tra tiếng Anh giao tiếp quốc tế) là một bài thi nhằm đánh giá trình độ sử dụng tiếng Anh dành cho những người sử dụng tiếng Anh như một ngoại ngữ (không phải tiếng mẹ đẻ), đặc biệt là những đối tượng muốn sử dụng tiếng Anh trong môi trường giao tiếp và làm việc quốc tế. Kết quả của bài thi TOEIC phản ánh mức độ thành thạo khi giao tiếp bằng tiếng Anh trong các hoạt động như kinh doanh, thương mại, du lịch… Kết quả này có hiệu lực trong vòng 02 năm và được công nhận tại nhiều quốc gia trong đó có Việt Nam."}</p>

          <Button
            style={{ display: "inline-block" }}
            className="button"
            variant="primary"
            // onClick={HandleStart}
          >
            <NavLink className={"button-text"} exact to={"/ToeicInfor"}>
            Xem chi tiết
            </NavLink>
          </Button>
        </div>
        <div className="Container">
          <h3 className="HeadingText">{"Trang web thi thử TOEIC này giúp được gì cho bạn"}</h3>
          <p className="DescriptionText">{"Mọi người khi đi thi lấy chứng chỉ đều mong muốn có được số điểm mà bản thân cần, tuy nhiên không phải ai cũng biết được rõ trình độ tiếng Anh của bản thân mà để thực hiện một bài thi lấy chứng chỉ tiếng Anh lại tốn kém tiền bạc và thời gian. Do vậy, trang web này được tạo ra để giúp cho mọi người ôn luyện với các đề thi thực tế cũng như để đánh giá được trình độ bản thân là rất cần thiết cho việc đi thi chính thức lấy được số điểm mà mình muốn."}</p>

          <Button
            style={{ display: "inline-block" }}
            className="button"
            variant="primary"
            // onClick={HandleStart}
          >
            <NavLink className={"button-text"} exact to={"/Exam"}>
              Làm bài thi Toeic
            </NavLink>
          </Button>
        </div>
        <div className="Container">
          <h3 className="HeadingText">{"Lịch thi Toeic nội bộ tại Trường Đại học Bách Khoa"}</h3>
          <p className="DescriptionText">{""}</p>

          <Button
            style={{ display: "inline-block" }}
            className="button"
            variant="primary"
            // onClick={HandleStart}
          >
            <a className={"button-text"} href={"https://cla.hust.edu.vn/cat/danh-sach-lich-thi/"}>
              Xem lịch thi
            </a>
          </Button>
        </div>
        <div className="Container">
          <h3 className="HeadingText">{"Thông tin về bài thi TOEIC"}</h3>
          <p className="DescriptionText">{"Bài thi TOEIC truyền thống là một bài kiểm tra trắc nghiệm bao gồm 02 phần: phần thi Listening (nghe hiểu) gồm 100 câu, thực hiện trong 45 phút và phần thi Reading (đọc hiểu) cũng gồm 100 câu nhưng thực hiện trong 75 phút. Tổng thời gian làm bài là 120 phút (2 tiếng)."}</p>

          <Button
            style={{ display: "inline-block" }}
            className="button"
            variant="primary"
            // onClick={HandleStart}
          >
            <NavLink className={"button-text"} exact to={"/Information"}>
              Xem chi tiết
            </NavLink>
          </Button>
        </div>
        <div className="Container">
          <h3 className="HeadingText">{"Các kiến thức tiếng anh cần trang bị trước khi thi TOEIC"}</h3>
          <p className="DescriptionText">{"Bài thi Toeic là bài kiểm tra Tiếng Anh đánh giá khả năng sử dụng Tiếng Anh trong các tình huống thường ngày của các đối tượng muốn sinh sống và làm việc trong môi trường quốc tế. Ngoài ra, đây còn là chuẩn ngoại ngữ để các bạn sinh viên đủ điều kiện tốt nghiệp ra trường. Muốn vượt qua bài kiểm tra này, điều bạn cần quan tâm đó là phải nắm vững Ngữ pháp tiếng anh cũng như các từ vừng hay gặp trong bài thi Toeic."}</p>

          <Button
            style={{ display: "inline-block" }}
            className="button"
            variant="primary"
            // onClick={HandleStart}
          >
            <NavLink className={"button-text"} exact to={"/Summary"}>
            Xem chi tiết
            </NavLink>
          </Button>
        </div>
      </Container>
    </Layout>
  );
}

export default ToeicInforView;
