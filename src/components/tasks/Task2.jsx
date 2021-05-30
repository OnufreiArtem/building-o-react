import React from "react";

import {
    Container,
    Box,
    Grid,
    Typography,
    IconButton,
    Button,
    LinearProgress,
    Drawer,
} from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import { makeStyles } from "@material-ui/core/styles";
import BasicModelTable from "../model-table/ModelTable";
import * as constants from "../constants";
import { listObjectGenerator } from "../lists";
import axios from "axios";

const useTask2Styles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
    },
    floatingActionBtn: {
        margin: 0,
        top: "auto",
        right: 50,
        bottom: 50,
        left: "auto",
        position: "fixed",
    },
    visible: {
        visibility: "visible",
    },
    notVisible: {
        visibility: "hidden",
    },
    someSpacing: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));

export default function Task2() {
    const classes = useTask2Styles();

    const [loading, setLoading] = React.useState(false);
    const [dataList, setDataList] = React.useState([]);

    const fetchData = () => {
        setLoading(true);
        axios
            .get(constants.apiURL + constants.entities.task_2.apiPath + '/')
            .then((response) => {
                setDataList(response.data);
                setLoading(false);
            });
    };
    
    const handleRefresh = () => {
        fetchData();
    };

    React.useEffect(handleRefresh, []);


    return (
        <Container maxWidth="lg">
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        flexDirection="row"
                        alignItems="center"
                    >
                        <Typography
                            className={classes.someSpacing}
                            variant="h4"
                            component="h4"
                        >
                        </Typography>
                        <Box>
                            <IconButton
                                aria-label="refresh"
                                className={classes.someSpacing}
                                onClick={handleRefresh}
                            >
                                <UpdateIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <LinearProgress
                        className={
                            loading ? classes.visible : classes.notVisible
                        }
                    />
                    <BasicModelTable
                        listOfData={dataList.map((item) => ({
                            id: item.management.id,
                            name: item.management.name,
                            address: item.management.address,
                            earnings: item.earning,
                        }))}
                        noActions={true}
                        title="The income from managements"
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
