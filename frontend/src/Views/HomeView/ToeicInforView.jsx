import "./styles.css";
import React from "react";
import Layout from "../../Layout";
import { Button ,Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { Grid, Card, Text } from "@nextui-org/react";

function HomeView() {
  return (
    <Layout title="Home">
      <Container className="Home">
      {/* <h1>Website thi thử TOEIC</h1> */}
        <div className="Container">
        <div id="banner" class="_10xtV"  data-reactid="125"><span class="_1raIJ" data-reactid="126"><h1 style={{ display: "inline-block" ,margin:20}}>Website thi thử TOEIC</h1></span><br data-reactid="129"></br><Button
            style={{ display: "inline-block" ,margin:20}}
            className="button"
            variant="primary"
            // onClick={HandleStart}
          >
            <NavLink className={"button-text"} exact to={"/Exam"}>
            Vào thi
            </NavLink>
          </Button></div>
          <h3 className="HeadingText">{"TOEIC là gì? "}</h3>
          <p className="DescriptionText">{"TOEIC (viết tắt của Test of English for International Communication - Bài kiểm tra tiếng Anh giao tiếp quốc tế) là một bài thi nhằm đánh giá trình độ sử dụng tiếng Anh dành cho những người sử dụng tiếng Anh như một ngoại ngữ (không phải tiếng mẹ đẻ), đặc biệt là những đối tượng muốn sử dụng tiếng Anh trong môi trường giao tiếp và làm việc quốc tế. Kết quả của bài thi TOEIC phản ánh mức độ thành thạo khi giao tiếp bằng tiếng Anh trong các hoạt động như kinh doanh, thương mại, du lịch… Kết quả này có hiệu lực trong vòng 02 năm và được công nhận tại nhiều quốc gia trong đó có Việt Nam."}</p>

        </div>
        <div className="Container">
          <h3 className="HeadingText">{"Lịch sử hình thành"}</h3>
          <p className="DescriptionText">{"Chương trình thi TOEIC được xây dựng và phát triển bởi Viện Khảo thí Giáo dục (ETS – Educational Testing Service), Hoa Kỳ – một tổ chức nổi tiếng và uy tín chuyên cung cấp các chương trình kiểm tra trắc nghiệm như TOEFL, GRE, GMAT… theo đề nghị từ Liên đoàn Tổ chức Kinh tế Nhật Bản (Keidanren) kết hợp với Bộ Công thương Quốc tế Nhật Bản – MITI (nay là Bộ Kinh tế, Thương mại và Công nghiệp Nhật Bản – METI) vào năm 1979.  Bài thi TOEIC được thiết kế dựa trên cơ sở tiền thân của nó là chương trình trắc nghiệm TOEFL. Và tính đến nay, sau hơn 35 năm, ETS đã tổ chức kiểm tra cho nhiều triệu lượt người tham dự trên khắp thế giới. Ở Việt Nam, TOEIC bắt đầu được tổ chức thi từ năm 2001 thông qua đại diện là IIG Việt Nam, được ưa thích và phổ biến rộng rãi hơn khoảng 5 năm sau đó."}</p>

        </div>
        <div className="Container">
          <h3 className="HeadingText">{"TOEIC dùng để làm gì?"}</h3>
          <p className="DescriptionText">{"Trước đây tại Việt Nam, nhiều công ty, doanh nghiệp, tổ chức… thường sử dụng chứng chỉ tiếng Anh phân chia theo cấp độ A, B, C (chứng chỉ ABC) như một tiêu chí ngoại ngữ để đưa ra quyết định về tuyển dụng, bổ nhiệm, sắp xếp nhân sự hay bố trí nhân viên tu nghiệp tại nước ngoài. Tuy nhiên trong khoảng 07 năm trở lại đây, chứng chỉ TOEIC nổi lên như một tiêu chuẩn phổ biến hơn để đánh giá trình độ thông thạo tiếng Anh của người lao động.Test EnglishXuất phát từ thực tế đó, nhiều trường Đại học, Cao đẳng đã đưa TOEIC vào chương trình giảng dạy và lựa chọn bài thi TOEIC để theo dõi sự tiến bộ trong việc học tiếng Anh đối với sinh viên theo từng học kỳ, năm học hoặc sử dụng làm chuẩn đầu ra tiếng Anh cho sinh viên tốt nghiệp. Chính vì những lý do đó nên việc học TOEIC, luyện thi TOEIC và tham dự kỳ thi TOEIC đóng vai trò quan trọng trong việc chuẩn bị hành trang kiến thức với nhiều sinh viên và người đi làm."}</p>

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
          <h3 className="HeadingText">{"Chuẩn TOEIC? Cần đạt bao nhiêu điểm TOEIC để được cấp chứng chỉ"}</h3>
          <p className="DescriptionText">{"Cũng giống như bài thi IELTS, kết quả của bài thi TOEIC không có mức điểm để quy định đỗ hay trượt mà chỉ phản ánh trình độ sử dụng tiếng Anh của người tham dự. Tuy nhiên tại nhiều trường Đại học tại Việt Nam, đều có quy định chuẩn đầu ra tiếng Anh. Theo đó, sinh viên khi tốt nghiệp phải đạt chuẩn tiếng Anh tương đương với TOEIC 450 hoặc cao hơn tùy theo chuyên ngành. Khi tham dự thi TOEIC bạn cũng cần lưu ý: Nếu muốn cung cấp thêm phiếu điểm để nộp Hồ sơ tuyển dụng cho các đơn vị tuyển dụng, thí sinh phải đạt điểm TOEIC từ 200 trở lên. Nếu muốn cung cấp thêm phiếu điểm để nộp Hồ sơ du học, thí sinh phải đạt điểm TOEIC từ 500 trở lên. Lệ phí cho mỗi phiếu điểm in thêm là 50.000 đồng, nếu cần chuyển phát nhanh thì nộp thêm 15.000 đồng."}</p>

        </div>
        <div className="Container">
          <h3 className="HeadingText">{"Một số mức điểm TOEIC tham khảo"}</h3>
          <li>TOEIC 100 - 300 điểm: Trình độ cơ bản. Khả năng giao tiếp tiếng Anh kém.</li>
          <li>TOEIC 300 - 450 điểm: Có khả năng hiểu & giao tiếp tiếng Anh mức độ trung bình. Là yêu cầu đối với học viên tốt nghiệp các trường nghề, cử nhân các trường Cao đẳng (hệ đào tạo 3 năm).</li>
          <li>TOEIC 450 - 650 điểm: Có khả năng giao tiếp tiếng Anh khá. Là yêu cầu chung đối với SV tốt nghiệp Đại học hệ đào tạo 4-5 năm; nhân viên, trưởng nhóm tại các doanh nghiệp có yếu tố nước ngoài.</li>
          <li>TOEIC 650 - 850 điểm: Có khả năng giao tiếp tiếng Anh tốt. Là yêu cầu đối với cấp trưởng phòng, quản lý điều hành cao cấp, giám đốc trong môi trường làm việc quốc tế.</li>
          <li>TOEIC 850 - 990 điểm: Có khả năng giao tiếp tiếng Anh rất tốt. Sử dụng gần như người bản ngữ dù tiếng Anh không phải tiếng mẹ đẻ.</li>
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

export default HomeView;
