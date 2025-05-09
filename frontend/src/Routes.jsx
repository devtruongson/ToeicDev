import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./About.jsx";
import useToken from "./Helper/useToken.jsx";
import LoginView from "./Views/AuthView/LoginView.jsx";
import RegisterView from "./Views/AuthView/RegisterView.jsx";
import DashboardView from "./Views/DashboardView/index.jsx";
import ExamListView from "./Views/ExamView/ExamListView.jsx";
import ExamView from "./Views/ExamView/index.jsx";
import HomeView from "./Views/HomeView/HomePage.jsx";
import ToeicInforView from "./Views/HomeView/ToeicInforView.jsx";
import SummaryView from "./Views/SummaryView/index.jsx";
import ToeicStructView from "./Views/ToeicStructView/index.jsx";
import UserInfoView from "./Views/UserInfoView/index.jsx";
import Admin from "./admin/App.js";

const Routes = () => {
    const { token, setToken } = useToken();
    let admin = Admin;
    // if(!token){
    //   admin=LoginView
    // }else{
    //   admin=Admin
    // }

    return (
        <>
            <Switch>
                <Route exact path={"/"}>
                    <HomeView />
                </Route>
                <Route exact path={"/about"}>
                    <About />
                </Route>
                <Route exact path={"/Home"}>
                    <HomeView />
                </Route>
                <Route exact path={"/ToeicInfor"}>
                    <ToeicInforView />
                </Route>
                <Route exact path={"/Information"}>
                    <ToeicStructView />
                </Route>
                <Route exact path={"/Summary"}>
                    <SummaryView />
                </Route>
                <Route exact path={"/Exam"}>
                    <ExamListView />
                </Route>
                <Route exact path={"/examTest/:id"}>
                    <ExamView />
                </Route>
                <Route exact path={"/Admin"} component={admin}></Route>
                <Route exact path={"/Login"}>
                    <LoginView />
                </Route>
                <Route exact path={"/Register"}>
                    <RegisterView />
                </Route>
                <Route exact path={"/Dashboard"}>
                    <DashboardView />
                </Route>
                <Route exact path={"/User"}>
                    <UserInfoView />
                </Route>
                <Route exact path={"/*"}>
                    <HomeView />
                </Route>
            </Switch>
        </>
    );
};

export default Routes;
