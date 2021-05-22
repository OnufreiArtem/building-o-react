import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";
import ClassIcon from "@material-ui/icons/Class";

import { Link } from "react-router-dom";

export const listGenerator = (list) => {
    return (
        <div>
            {list.map((model) => (
                <ListItem button>
                    <ListItemText primary={model} />
                </ListItem>
            ))}
        </div>
    );
};

export const mainList = (
    <div>
        <Link to="/">
            <ListItem button>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>
        <Link to="/models">
            <ListItem button>
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <ListItemText primary="Models" />
            </ListItem>
        </Link>
        <Link to="/settings">
            <ListItem button>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
        </Link>
        <Link to="/info">
            <ListItem button>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Info" />
            </ListItem>
        </Link>
    </div>
);
