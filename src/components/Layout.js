import {
  Drawer,
  Hidden,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
import { UserContext } from "../context/UserContext";
import { NoteContext } from "../context/NoteContext";
import { AuthContext } from "../context/AuthContext";
import MenuIcon from "@material-ui/icons/Menu";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      padding: theme.spacing(3),
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      backgroundColor: "#eeeeee",
    },
    title: {
      padding: theme.spacing(2),
    },
    menuButton: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    appbar: {
      width: "100%",
      backgroundColor: pink[900],
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    link: {
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  };
});

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { setUserData } = useContext(UserContext);
  const { setUserNotes } = useContext(NoteContext);
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const menuItems = [
    {
      text: "My notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/notes",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/note/add",
    },
  ];

  function userLogout() {
    setUserData({
      token: "",
      id: "",
    });
    localStorage.setItem("auth-token", "");
    setUserNotes([]);
    setIsAuth(false);
    history.push("/");
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function changePath(path) {
    history.push(path);
    setMobileOpen(false);
  }

  const drawer = (
    <>
      <div>
        <Typography variant="h5" className={classes.title}>
          <Link to="/">Notes App</Link>
        </Typography>
      </div>
      <List>
        {menuItems.map((item) => {
          return (
            <ListItem
              key={item.text}
              button
              onClick={() => changePath(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          {isAuth ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h5" className={classes.title}>
            <Link to="/" style={{ color: "#fff" }}>
              Notes App
            </Link>
          </Typography>
          <Typography className={classes.link} onClick={userLogout}>
            {isAuth ? "Logout" : "Login"}
          </Typography>
        </Toolbar>
      </AppBar>

      {isAuth ? (
        <>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              className={classes.drawer}
              classes={{ paper: classes.drawerPaper }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </>
      ) : null}

      <div className={classes.toolbar}></div>
      {children}
    </div>
  );
};

export default Layout;
