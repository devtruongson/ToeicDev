import React, { Component,useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../dist/css/adminlte.min.css";
import { BrowserRouter,MemoryRouter as Router, Switch, Route, Link,useHistory } from 'react-router-dom';
import './Pages/style.css'
import axios from "axios";
import { API_BASE_URL } from "../Constraint/api";

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import HeaderComponent from './components/header.component';
import SidebarComponent from './components/sidebar.component';
import ExamPage from './Pages/Exam.Page';
import ExamPage2 from './Pages/Exam2.Page';
import ExamEditPage from './Pages/ExamEdit.Page';
import Test from './Pages/Test.Page';
import useToken from "../Helper/useToken";
import { useState } from 'react';

const Admin = ({ match })=> {
  const history = useHistory();
    
  const { token, setToken } = useToken();
  const {errorMes,setError} = useState('');
  const [loading, setLoading] = useState(false);
  console.log(token);
    // console.log(match);
    const fetchData = async () => {
        setLoading(true);
          const response  = await axios.get(
            API_BASE_URL + "api/test/admin",
            {
              headers: {
                "Content-Type": "application/json",
                "x-access-token":token
              },
            }
          )
          .catch( (error) => {
            if (error.response) {
              // console.log(error.response.data.message);
              history.push("/exam2")
            }
          });

        //   setData(response);
        //   setLoading(false);
      
        setLoading(false);
      };
    
      useEffect(() => {
        fetchData();
      }, []);
        return (
            <Router>
                <div className="container">
                <HeaderComponent  match={match}/>
                <h1>{errorMes}</h1>
                {/* <SidebarComponent match={match}/> */}
                    {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/create'} className="nav-link">Create</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/Exam'} className="nav-link">Exam</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/Exam2'} className="nav-link">Exam</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/index'} className="nav-link">Index</Link>
                                </li>
                            </ul>
                        </div>
                    </nav> <br/>
                    <h2>Create app CRUD with ReactJs, NodeJs, MongoDB</h2> <br/> */}
                    <Switch>
                        <Route exact path={`/Exam2`} component={ ExamPage2 } />
                        <Route  path={`${match.path}/create`} component={ Create } />
                        <Route path={`/edit/:id`} component={ ExamEditPage } />
                        <Route path={`/Exam`} component={ ExamPage } />
                        <Route path={`/Test`} component={ Test } />
                        <Route path={`${match.path}`} component={ ExamPage2 } />
                    </Switch>
                </div>
                {/* <ExamPage2></ExamPage2> */}
            </Router>
        );
    }



export default Admin;
