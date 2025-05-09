// import React from "react";
// import { FaBars } from "react-icons/fa";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
// import useToken from "./Helper/useToken";
// import { Button } from "react-bootstrap";
// import { Link, NavLink, useHistory } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// const Header = (props) => {
//   const { token, setToken } = useToken();
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const history = useHistory();
//   const handleLogout = () => {
//     setToken('');
//     history.push(`/`);
//   };
//   let MenuComponent
//   if (!token) {
//     MenuComponent = ()=>{
//       return(<Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 getContentAnchorEl={null}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//                 transformOrigin={{ vertical: "top", horizontal: "left" }}
//                 open={open}
//                 onClose={handleClose}
//               >
//                 <Link exact to={"/Login"}>
//                   <MenuItem onClick={handleClose}>Đăng nhập</MenuItem>
//                 </Link>
//               </Menu>)
//     }
//   }else{
//     MenuComponent = ()=>{
//       return(<Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 getContentAnchorEl={null}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//                 transformOrigin={{ vertical: "top", horizontal: "left" }}
//                 open={open}
//                 onClose={handleClose}
//               >
//                 <Link exact to={"/User"}>
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 </Link>
//                 <Link exact to={"/Dashboard"}>
//                   <MenuItem onClick={handleClose}>Dashboard</MenuItem>
//                 </Link>
//                 <Link exact to={"/Admin"}>
//                   <MenuItem onClick={handleClose}>Amdin</MenuItem>
//                 </Link>
//                 <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
//               </Menu>)
//     }
//   }
//   return (
//     <header>
//       <div className={classes.root}>
//         <AppBar style={{ background: "#7b1e5c" }} position="static">
//           <Toolbar>
//             <div
//               className={`btn-toggle ${classes.menuButton}`}
//               onClick={() => props.handleToggleSidebar(true)}
//             >
//               <FaBars />
//             </div>
//             <Typography variant="h4" className={classes.title}>
//               {props.title || "Thi thử Toeic"}
//             </Typography>

//             <div>
//               <IconButton
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//               <MenuComponent/>
//               {/* <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 getContentAnchorEl={null}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//                 transformOrigin={{ vertical: "top", horizontal: "left" }}
//                 open={open}
//                 onClose={handleClose}
//               >
//                 <Link exact to={"/User"}>
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 </Link>
//                 <Link exact to={"/Dashboard"}>
//                   <MenuItem onClick={handleClose}>Dashboard</MenuItem>
//                 </Link>
//                 <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
//               </Menu> */}
//             </div>
//           </Toolbar>
//           <Toolbar   position="sticky" className={"navLink-bar"}>
//             <NavLink className={"navLink-text"} exact to={"/Home"}>
//             Trang chủ
//             </NavLink>
//             <NavLink className={"navLink-text"} exact to={"/Exam"}>
//             Thi thử Toeic
//             </NavLink>
//             <NavLink className={"navLink-text"} exact to={"/Information"}>
//             Thông tin bài thi
//             </NavLink>
//             <NavLink className={"navLink-text"} exact to={"/Summary"}>
//             Ôn tập kiến thức
//             </NavLink>
//           </Toolbar>
//         </AppBar>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useToken from "./Helper/useToken";
import { Link, NavLink, useHistory } from "react-router-dom";
import { FaBars, FaGraduationCap } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        transition: "all 0.3s",
        "&:hover": {
            transform: "scale(1.1)",
        },
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        "& svg": {
            marginRight: theme.spacing(1),
        },
    },
    appBar: {
        background: "linear-gradient(45deg, #7b1e5c 30%, #9c2872 90%)",
        boxShadow: "0 4px 12px rgba(123, 30, 92, 0.3)",
    },
    navLinkBar: {
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.08)",
    },
    navLink: {
        color: "white",
        padding: "10px 20px",
        margin: "0 5px",
        textDecoration: "none",
        borderRadius: "4px",
        transition: "all 0.3s",
        fontSize: "15px",
        position: "relative",
        "&:hover": {
            background: "rgba(255, 255, 255, 0.15)",
        },
        "&.active": {
            background: "rgba(255, 255, 255, 0.2)",
            fontWeight: "bold",
            "&:after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "20%",
                width: "60%",
                height: "3px",
                background: "white",
                borderRadius: "2px",
            },
        },
    },
    accountButton: {
        background: "rgba(255, 255, 255, 0.15)",
        padding: theme.spacing(1),
        transition: "all 0.3s",
        "&:hover": {
            background: "rgba(255, 255, 255, 0.25)",
            transform: "scale(1.05)",
        },
    },
    menuItem: {
        padding: "10px 16px",
        minWidth: "150px",
        transition: "all 0.2s",
        "&:hover": {
            background: "rgba(123, 30, 92, 0.1)",
        },
    },
    menuPaper: {
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
    },
}));

const Header = (props) => {
    const { token, setToken } = useToken();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const history = useHistory();
    const handleLogout = () => {
        setToken("");
        history.push(`/`);
    };

    let MenuComponent;
    if (!token) {
        MenuComponent = () => {
            return (
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    open={open}
                    onClose={handleClose}
                    classes={{ paper: classes.menuPaper }}
                >
                    <Link
                        exact
                        to={"/Login"}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <MenuItem
                            onClick={handleClose}
                            className={classes.menuItem}
                        >
                            Đăng nhập
                        </MenuItem>
                    </Link>
                </Menu>
            );
        };
    } else {
        MenuComponent = () => {
            return (
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    open={open}
                    onClose={handleClose}
                    classes={{ paper: classes.menuPaper }}
                >
                    <Link
                        exact
                        to={"/User"}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <MenuItem
                            onClick={handleClose}
                            className={classes.menuItem}
                        >
                            Profile
                        </MenuItem>
                    </Link>
                    <Link
                        exact
                        to={"/Dashboard"}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <MenuItem
                            onClick={handleClose}
                            className={classes.menuItem}
                        >
                            Dashboard
                        </MenuItem>
                    </Link>
                    <Link
                        exact
                        to={"/Admin"}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <MenuItem
                            onClick={handleClose}
                            className={classes.menuItem}
                        >
                            Admin
                        </MenuItem>
                    </Link>
                    <MenuItem
                        onClick={handleLogout}
                        className={classes.menuItem}
                    >
                        Đăng xuất
                    </MenuItem>
                </Menu>
            );
        };
    }

    return (
        <header>
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <div
                            className={`btn-toggle ${classes.menuButton}`}
                            onClick={() => props.handleToggleSidebar(true)}
                        >
                            <FaBars />
                        </div>
                        <Typography variant="h4" className={classes.title}>
                            <FaGraduationCap />
                            {props.title || "Thi thử Toeic"}
                        </Typography>

                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                className={classes.accountButton}
                            >
                                <AccountCircle />
                            </IconButton>
                            <MenuComponent />
                        </div>
                    </Toolbar>
                    <Toolbar position="sticky" className={classes.navLinkBar}>
                        <NavLink
                            className={classes.navLink}
                            exact
                            to={"/Home"}
                            activeClassName="active"
                        >
                            Trang chủ
                        </NavLink>
                        <NavLink
                            className={classes.navLink}
                            exact
                            to={"/Exam"}
                            activeClassName="active"
                        >
                            Thi thử Toeic
                        </NavLink>
                        <NavLink
                            className={classes.navLink}
                            exact
                            to={"/Information"}
                            activeClassName="active"
                        >
                            Thông tin bài thi
                        </NavLink>
                        <NavLink
                            className={classes.navLink}
                            exact
                            to={"/Summary"}
                            activeClassName="active"
                        >
                            Ôn tập kiến thức
                        </NavLink>
                    </Toolbar>
                </AppBar>
            </div>
        </header>
    );
};

export default Header;
