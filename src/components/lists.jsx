import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";
import ClassIcon from "@material-ui/icons/Class";

import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

import { nanoid } from "nanoid";

export const listGenerator = (list) => {
    return (
        <div>
            {list.map((model) => (
                <ListItem key={nanoid()} button>
                    <ListItemText primary={model} />
                </ListItem>
            ))}
        </div>
    );
};

export const MainList = () => {
    const history = useHistory();

    return (
        <div>
            <ListItem onClick={() => history.push("/")} button>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem onClick={() => history.push("/models")} button>
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <ListItemText primary="Models" />
            </ListItem>
            <ListItem onClick={() => history.push("/settings")} button>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
            <ListItem onClick={() => history.push("/info")} button>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Info" />
            </ListItem>
        </div>
    );
};
