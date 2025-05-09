import React, { Component, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../dist/css/adminlte.min.css";
import {
    MemoryRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
import "./Pages/style.css";
import axios from "axios";
import { API_BASE_URL } from "../Constraint/api";

import Create from "./components/create.component";
import HeaderComponent from "./components/header.component";
import ExamPage from "./Pages/Exam.Page";
import ExamPage2 from "./Pages/Exam2.Page";
import ExamEditPage from "./Pages/ExamEdit.Page";
import Test from "./Pages/Test.Page";
import useToken from "../Helper/useToken";
import { useState } from "react";

const Admin = ({ match }) => {
    const history = useHistory();
    const { token, setToken } = useToken();
    const { errorMes, setError } = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const response = await axios
            .get(API_BASE_URL + "api/test/admin", {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token,
                },
            })
            .catch((error) => {
                if (error.response) {
                    history.push("/exam2");
                }
            });

        setLoading(false);
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);
    return (
        <Router>
            <div className="container">
                <HeaderComponent match={match} />
                <h1>{errorMes}</h1>
                <Switch>
                    <Route exact path={`/Exam2`} component={ExamPage2} />
                    <Route path={`${match.path}/create`} component={Create} />
                    <Route path={`/edit/:id`} component={ExamEditPage} />
                    <Route path={`/Exam`} component={ExamPage} />
                    <Route path={`/Test`} component={Test} />
                    <Route path={`${match.path}`} component={ExamPage2} />
                </Switch>
            </div>
        </Router>
    );
};

export default Admin;
