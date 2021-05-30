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

const useTask1Styles = makeStyles((theme) => ({
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

export default function Task1(props) {
    const classes = useTask1Styles();

    const [loading, setLoading] = React.useState(false);
    const [dataList, setDataList] = React.useState([]);
    const [plotList, setPlotList] = React.useState([]);
    const [selectedId, setSelectedId] = React.useState(undefined);
    const [showDrawer, setShowDrawer] = React.useState(false);

    const fetchPlotList = () => {
        axios
            .get(constants.apiURL + constants.entities.plot.apiPath + "/")
            .then((r) =>
                setPlotList(
                    r.data.map((item) => ({ id: item.id, data: item.address }))
                )
            );
    };

    React.useEffect(() => {
        fetchPlotList();
    }, []);

    React.useEffect(() => {
        setSelectedId(plotList[0]?.id || undefined);
    }, [plotList]);

    React.useEffect(() => {
        console.log(selectedId);
        if (selectedId !== undefined) {
            fetchData();
        }
    }, [selectedId]);

    const fetchData = () => {
        setLoading(true);
        if (selectedId !== undefined) {
            axios
                .get(
                    constants.apiURL +
                        constants.entities.task_1.apiPath +
                        `/${selectedId}`
                )
                .then((response) => {
                    setDataList(response.data);
                    setLoading(false);
                });
        }
    };

    const handleRefresh = async () => {
        fetchData();
    };

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
                            <Button
                                onClick={() => {
                                    setShowDrawer(true);
                                }}
                            >
                                Select Plot
                            </Button>

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
                        listOfData={dataList.map(item => ({id: item.id, name: item.name + " " + item.surname, specification: item.specification?.name}))}
                        noActions={true}
                        title="Employees from plot"
                    />

                    <Drawer
                        anchor={"right"}
                        open={showDrawer}
                        onClose={() => setShowDrawer(false)}
                    >
                        {listObjectGenerator(plotList, selectedId, (_, id) => {
                            setSelectedId(id);
                        })}
                    </Drawer>
                </Grid>
            </Grid>
        </Container>
    );
}
