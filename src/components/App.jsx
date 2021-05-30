import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import Home from "./home/Home";
import Info from "./info/Info";
import Models from "./models/Models";
import { useStyles } from "./mainStyles";
import { MainList, AdditionalList } from "./lists";
import Task1 from './tasks/Task1';
import Task2 from './tasks/Task2';

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
        setImmediate(!collapseOpen);
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
                    <AdditionalList />
                </Drawer>

                {/* Main Content */}
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <div className={classes.spaceDivider} />
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
                            <Info />
                        </Route>
                        <Route path="/task_1">
                            <Task1 />
                        </Route>
                        <Route path="/task_2">
                            <Task2 />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}
