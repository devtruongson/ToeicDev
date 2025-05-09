import "../../plugin/icheck-bootstrap.min.css";
import { useState } from "react";
import "../../dist/css/adminlte.min.css";
import useToken from "../../Helper/useToken";
import { API_BASE_URL } from "../../Constraint/api";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function LoginView() {
    const { token, setToken } = useToken();
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const checkPass = (rePass) => {
        if (rePass != password) {
            setErrMsg("Mật khẩu không giống nhau");
            return;
        }
        setErrMsg("");
    };

    const RegisterHandle = async (e) => {
        e.preventDefault();

        try {
            console.log(
                JSON.stringify({ name: fullName, username, password, email })
            );
            const response = await axios.post(
                API_BASE_URL + "api/auth/signup",
                JSON.stringify({ name: fullName, username, password, email }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            console.log(response);
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
        }
    };
    return (
        <div style={{ margin: "auto", marginTop: 100 }} class="register-box">
            {success && <Redirect to="/Login" state={{ from: location }} />}
            <div class="register-logo">
                <b>Đăng ký tài khoản</b>
            </div>
            <div class="card">
                <div class="card-body register-card-body">
                    <p class="login-box-msg">
                        Nhập thông tin tạo tài khoản người dùng mới
                    </p>

                    <form>
                        <div class="input-group mb-3">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Full name"
                                onChange={(e) => setFullName(e.target.value)}
                            ></input>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input
                                type="text"
                                class="form-control"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="UserName"
                            ></input>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input
                                type="email"
                                class="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            ></input>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input
                                type="password"
                                class="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            ></input>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input
                                type="password"
                                class="form-control"
                                onChange={(e) => checkPass(e.target.value)}
                                placeholder="Retype password"
                            ></input>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        {errMsg ?? <p class={"error-text"}>*{errMsg}*</p>}
                        <div class="row">
                            <div class="col-8"></div>
                            <div class="col-4">
                                <button
                                    onClick={RegisterHandle}
                                    class="btn btn-primary btn-block"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>

                    <NavLink className={"button-text"} exact to={"/Login"}>
                        <p class="mb-0">
                            <a class="text-center">
                                I already have a membership
                            </a>
                        </p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default LoginView;
