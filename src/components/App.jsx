import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
} from "react-router-dom";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Home from "./home/Home";
import Models from "./models/Models";
import { useStyles } from "./mainStyles";
import { models, mainLocations } from "./constants";
import { listGenerator, MainList } from "./lists";

export default function App() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleCollapseClick = () => {
        setCollapseOpen(!collapseOpen);
    };

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={clsx(
                        classes.appBar,
                        open && classes.appBarShift
                    )}
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(
                                classes.menuButton,
                                open && classes.menuButtonHidden
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Building Organization Application
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/* Drawer */}
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(
                            classes.drawerPaper,
                            !open && classes.drawerPaperClose
                        ),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <MainList />
                    <Divider />
                    <ListItem button onClick={handleCollapseClick}>
                        <ListItemText primary="Models" />
                        {collapseOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                        {listGenerator(models)}
                    </Collapse>
                </Drawer>

                {/* Main Content */}
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/models">
                            <Models />
                        </Route>
                        <Route path="/settings">
                            <Typography>Settings</Typography>
                        </Route>
                        <Route path="/info">
                            <Typography>Info</Typography>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}
