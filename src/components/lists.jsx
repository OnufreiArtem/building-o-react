import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
// import SettingsIcon from "@material-ui/icons/Settings";
import ClassIcon from "@material-ui/icons/Class";
import AssignmentIcon from '@material-ui/icons/Assignment';

import { useHistory } from "react-router-dom";

import { nanoid } from "nanoid";

export const listGenerator = (list, selectedIndex, onItemClicked) => {
    return (
        <div>
            {list.map((model, index) => (
                <ListItem
                    key={nanoid()}
                    selected={
                        selectedIndex !== undefined
                            ? selectedIndex === index
                            : false
                    }
                    onClick={(event) => onItemClicked !== undefined && onItemClicked(event, index)}
                    button
                >
                    <ListItemText primary={model} />
                </ListItem>
            ))}
        </div>
    );
};

export const listObjectGenerator = (list, selectedId, onItemClicked) => {
    return (
        <div>
            {list.map((model) => (
                <ListItem
                    key={model.id}
                    selected={
                       model.id === selectedId
                    }
                    onClick={(event) => onItemClicked !== undefined && onItemClicked(event, model.id)}
                    button
                >
                    <ListItemText primary={model.data} />
                </ListItem>
            ))}
        </div>
    );
};

export const MainList = (props) => {
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
            {/* <ListItem onClick={() => history.push("/settings")} button>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem> */}
            <ListItem onClick={() => history.push("/info")} button>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Info" />
            </ListItem>
        </div>
    );
};


export const AdditionalList = (props) => {
    const history = useHistory();

    return (
        <div>
            {/* <ListItem onClick={() => history.push("/task_1")} button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Employees from plots" />
            </ListItem> */}
            <ListItem onClick={() => history.push("/task_1")} button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Management income" />
            </ListItem>
            
            
        </div>
    )
}
