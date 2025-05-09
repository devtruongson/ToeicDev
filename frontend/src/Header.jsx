import React from "react";
import { FaBars } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useToken from "./Helper/useToken";
import { Button } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
    setToken('');
    history.push(`/`);
  };
  let MenuComponent
  if (!token) {
    MenuComponent = ()=>{
      return(<Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={open}
                onClose={handleClose}
              >
                <Link exact to={"/Login"}>
                  <MenuItem onClick={handleClose}>Đăng nhập</MenuItem>
                </Link>
              </Menu>)
    }
  }else{
    MenuComponent = ()=>{
      return(<Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={open}
                onClose={handleClose}
              >
                <Link exact to={"/User"}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link exact to={"/Dashboard"}>
                  <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                </Link>
                <Link exact to={"/Admin"}>
                  <MenuItem onClick={handleClose}>Amdin</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>)
    }
  }
  return (
    <header>
      <div className={classes.root}>
        <AppBar style={{ background: "#7b1e5c" }} position="static">
          <Toolbar>
            <div
              className={`btn-toggle ${classes.menuButton}`}
              onClick={() => props.handleToggleSidebar(true)}
            >
              <FaBars />
            </div>
            <Typography variant="h4" className={classes.title}>
              {props.title || "Thi thử Toeic"}
            </Typography>
            
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <MenuComponent/>
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={open}
                onClose={handleClose}
              >
                <Link exact to={"/User"}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link exact to={"/Dashboard"}>
                  <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu> */}
            </div>
          </Toolbar>
          <Toolbar   position="sticky" className={"navLink-bar"}>
            <NavLink className={"navLink-text"} exact to={"/Home"}>
            Trang chủ
            </NavLink>
            <NavLink className={"navLink-text"} exact to={"/Exam"}>
            Thi thử Toeic
            </NavLink>
            <NavLink className={"navLink-text"} exact to={"/Information"}>
            Thông tin bài thi
            </NavLink>
            <NavLink className={"navLink-text"} exact to={"/Summary"}>
            Ôn tập kiến thức
            </NavLink>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
};

export default Header;
