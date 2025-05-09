import "./styles.css";
import Layout from "../../Layout";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaHeadphones, FaBook, FaInfoCircle } from "react-icons/fa";

function ToeicStructView() {
    const Data = {
        Listening: [
            {
                id: 1,
                name: "Part 1 : Mô tả hình ảnh",
                description:
                    "Tương ứng với mỗi bức ảnh, bạn sẽ được nghe 04 câu mô tả về nó. Nhiệm vụ của bạn là phải chọn câu mô tả đúng nhất cho bức ảnh.",
                count: 10,
                bgColor: "#ed5c64",
                icon: "📷",
            },
            {
                id: 2,
                name: "Part 2 : Hỏi và Đáp",
                description:
                    "Bạn sẽ nghe một câu hỏi (hoặc câu nói) và 03 lựa chọn trả lời. Nhiệm vụ của bạn là phải chọn ra câu trả lời đúng nhất trong ba đáp án A-B-C.",
                count: 30,
                bgColor: "#f49f0a",
                icon: "❓",
            },
            {
                id: 3,
                name: "Part 3 : Hội thoại ngắn",
                description:
                    "Bạn sẽ nghe 10 đoạn hội thoại ngắn. Mỗi đoạn có 03 câu hỏi. Nhiệm vụ của bạn là chọn ra câu trả lời đúng nhất trong 04 đáp án của đề thi.",
                count: 30,
                bgColor: "#04AA6D",
                icon: "💬",
            },
            {
                id: 4,
                name: "Part 4 : Đoạn thông tin ngắn",
                description:
                    "Bạn sẽ nghe 10 đoạn thông tin ngắn. Mỗi đoạn có 03 câu hỏi. Nhiệm vụ của bạn là chọn ra câu trả lời đúng nhất trong số 04 đáp án được cung cấp.",
                count: 30,
                bgColor: "#f08700",
                icon: "📢",
            },
        ],
        Reading: [
            {
                id: 5,
                name: "Part 5 : Hoàn thành câu",
                description:
                    "Bạn cần phải chọn từ đúng nhất để hoàn thành câu.",
                count: 40,
                bgColor: "#747474",
                icon: "✏️",
            },
            {
                id: 6,
                name: "Part 6 : Hoàn Thành Đoạn Văn",
                description:
                    "Mỗi đoạn văn có 03 chỗ trống. Bạn phải điền từ thích hợp còn thiếu vào mỗi chỗ trống trong đoạn văn đó.",
                count: 12,
                bgColor: "#c2c120",
                icon: "📝",
            },
            {
                id: 7,
                name: "Part 7.1 : Đọc hiểu đoạn đơn",
                description:
                    "Đề thi có thể có từ 7-10 đoạn văn đơn. Hết mỗi đoạn văn sẽ có 2-5 câu hỏi.",
                count: 28,
                bgColor: "#ef4a50",
                icon: "📄",
            },
            {
                id: 8,
                name: "Part 7.2 : Đọc hiểu đoạn kép",
                description:
                    "Trong phần này sẽ có từ 04 cặp đoạn văn. Hết mỗi cặp đoạn văn sẽ có 5 câu hỏi.",
                count: 20,
                bgColor: "#00a6a6",
                icon: "📑",
            },
        ],
    };

    const Content = ({ name, description, bgColor, icon }) => {
        return (
            <Card className="content-card mb-4 shadow-sm">
                <Card.Header
                    style={{ backgroundColor: bgColor, color: "white" }}
                >
                    <span className="part-icon">{icon}</span>
                    <span className="HeadingText">{name}</span>
                </Card.Header>
                <Card.Body>
                    <p className="DescriptionText">{description}</p>
                </Card.Body>
            </Card>
        );
    };

    return (
        <Layout title="Thông tin về bài thi Toeic">
            <div className="toeic-struct-page">
                <Container>
                    <div className="page-header text-center mb-5">
                        <h1 className="main-title">
                            <FaInfoCircle className="title-icon" />
                            Thông tin về bài thi Toeic
                        </h1>
                        <div className="underline"></div>

                        <div className="intro-text mt-4">
                            <p>
                                Một bài thi TOEIC đầy đủ gồm hai phần thi: Phần
                                thi
                                <strong> Listening (nghe hiểu)</strong> trong 45
                                phút và phần thi
                                <strong> Reading (đọc hiểu)</strong> trong 75
                                phút. Mỗi phần thi có 100 câu. Tổng số câu hỏi
                                của cả hai phần thi là 200 câu. Tổng thời gian
                                làm bài là 120 phút hay 2 tiếng.
                            </p>
                            <p className="highlight-text">
                                Cấu trúc và nội dung chi tiết của từng phần thi
                                như sau:
                            </p>
                        </div>
                    </div>

                    <div className="Toeic-Struct">
                        <div className="toeic-section mb-5">
                            <div className="section-header">
                                <h2 className="section-title">
                                    <FaHeadphones className="section-icon" />
                                    Phần A : Listening (Nghe hiểu)
                                </h2>
                                <div className="section-time">
                                    Thời gian: 45 phút
                                </div>
                            </div>

                            <div className="summary-bar-container mb-4">
                                {Data.Listening.map((item) => {
                                    return (
                                        <div
                                            className="summary-bar text-center"
                                            style={{
                                                width: `${item.count}%`,
                                                backgroundColor: `${item.bgColor}`,
                                            }}
                                            key={item.id}
                                        >
                                            <span className="part-number">
                                                {item.count}
                                            </span>
                                            <span className="part-name">
                                                {item.name.split(":")[0]}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <Row>
                                {Data.Listening.map((item) => {
                                    return (
                                        <Col md={6} key={item.id}>
                                            <Content
                                                name={item.name}
                                                description={item.description}
                                                bgColor={item.bgColor}
                                                icon={item.icon}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>

                        <div className="toeic-section">
                            <div className="section-header">
                                <h2 className="section-title">
                                    <FaBook className="section-icon" />
                                    Phần B : Reading (Đọc hiểu)
                                </h2>
                                <div className="section-time">
                                    Thời gian: 75 phút
                                </div>
                            </div>

                            <div className="summary-bar-container mb-4">
                                {Data.Reading.map((item) => {
                                    return (
                                        <div
                                            className="summary-bar text-center"
                                            style={{
                                                width: `${item.count}%`,
                                                backgroundColor: `${item.bgColor}`,
                                            }}
                                            key={item.id}
                                        >
                                            <span className="part-number">
                                                {item.count}
                                            </span>
                                            <span className="part-name">
                                                {item.name.split(":")[0]}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <Row>
                                {Data.Reading.map((item) => {
                                    return (
                                        <Col md={6} key={item.id}>
                                            <Content
                                                name={item.name}
                                                description={item.description}
                                                bgColor={item.bgColor}
                                                icon={item.icon}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                    </div>

                    <div className="score-info text-center mt-5 mb-4">
                        <h3>Thang điểm TOEIC</h3>
                        <p>
                            Điểm TOEIC được tính trên thang điểm từ 5 đến 495
                            cho mỗi phần thi.
                            <br />
                            Tổng điểm tối đa là 990 điểm.
                        </p>
                    </div>
                </Container>
            </div>
        </Layout>
    );
}

export default ToeicStructView;
