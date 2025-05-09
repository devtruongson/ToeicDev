# Website ôn luyện và thi thử toeic

Link demo : [https://tmd22121999.github.io/thi_toeic](https://tmd22121999.github.io/thi_toeic).

Website tạo ra với mục đích giúp mọi người ôn luyện lại kiến thức tiếng Anh quan trong trước khi thi Toeic cũng như làm bài kiểm tra thử Toeic để kiểm tra trình độ bản thân.

## Yêu cầu trước khi cài đặt trên local host :
Máy tính đã cài đặt `NodeJs`

## Chạy website trên local host :

- Đổi link api trong `src/constraint/api.jsx` như sau `const API_BASE_URL = "http://localhost:4000/";`
- Cài thư viện cần thiết `npm i` và `cd api2 && npm i`
- Khởi chạy server cho api `cd api2 && node server.js`
- Khởi chạy giao diện web `npm start`
- Mở [http://localhost:3000](http://localhost:3000) để hiện thị trên browser.
- Tài khoản thử nghiệm :
    + username : test
    + pass: matkhau99
