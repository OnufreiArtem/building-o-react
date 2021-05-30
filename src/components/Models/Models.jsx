import React from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useStyles } from "../mainStyles";
import { listGenerator } from "../lists";
import * as constants from "../constants";
import BasicModelTable from "../model-table/ModelTable";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import axios from "axios";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteDialog from "./DeleteDialog";
import AddDialog from "./AddDialog";
import { Box } from "@material-ui/core";
import { forms } from "../forms";
import EditDialog from "./EditDialog";

const useModelsStyles = makeStyles((theme) => ({
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

export default function Models(props) {
    const mainClasses = useStyles();
    const classes = useModelsStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [showDialog, setShowDialog] = React.useState(false);
    const [showEdit, setShowEdit] = React.useState(false);
    const [showModelDrawer, setShowModelDrawer] = React.useState(false);
    const [dataList, setDataList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
    const [selectedToDelete, setSelectedToDelete] = React.useState(undefined);
    const [selectedToEdit, setSelectedToEdit] = React.useState(undefined);

    const handleAddDialogOpen = () => {
        setShowDialog(true);
    };

    const handleAddDialogClose = () => {
        setShowDialog(false);
    };

    const handleCancelEditDialog = () => {
        setShowEdit(false);
        setSelectedToEdit(undefined);
    }

    const handleApplyEditDialog = () => {
        setShowEdit(false);
        setSelectedToEdit(undefined);
        handleRefresh();
    }

    const handleDelete = (env, data) => {
        deleteData(data.id);
        handleRefresh();
    };

    const handleRefresh = (e) => {
        setLoading(true);
        fetchData(true);
    };

    const cancelDeleteAlert = () => {
        setShowDeleteAlert(false);
        setSelectedToDelete(undefined);
    };

    const indeedDeleteAlert = () => {
        handleDelete(undefined, selectedToDelete);
        cancelDeleteAlert();
    };

    const deleteData = async (id) => {
        await axios
            .delete(
                `${constants.apiURL}${
                    Object.values(constants.entities)[selectedIndex].apiPath
                }/${id}`
            )
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    const fetchData = async (mounted) => {
        await axios
            .get(
                `${constants.apiURL}${
                    Object.values(constants.entities)[selectedIndex].apiPath
                }/`
            )
            .then((response) => {
                if (mounted) {
                    console.log(response.data);
                    setDataList(
                        response.data.map((entity) =>
                            Object.values(constants.entities)[
                                selectedIndex
                            ].alter(entity)
                        )
                    );
                    setLoading(false);
                }
            });
    };

    React.useEffect(() => {
        console.log(forms[selectedIndex]);
        let isMounted = true;
        setLoading(true);
        fetchData(isMounted);
        return () => {
            isMounted = false;
        };
    }, [selectedIndex]);

    return (
        <Container maxWidth="lg" className={mainClasses.container}>
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
                            Models
                        </Typography>
                        <Box>
                            <Button onClick={() => setShowModelDrawer(true)}>
                                Select Model
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
                        listOfData={dataList}
                        title={
                            Object.values(constants.entities)[selectedIndex]
                                .name
                        }
                        onEdit={(_, data) => {
                            console.log(data);
                            setSelectedToEdit(data.id);
                            setShowEdit(true);
                        }}
                        onDelete={(_, data) => {
                            setSelectedToDelete(data);
                            setShowDeleteAlert(true);
                        }}
                    />
                </Grid>
            </Grid>
            <Fab
                className={classes.floatingActionBtn}
                onClick={handleAddDialogOpen}
                color="primary"
                aria-label="add"
            >
                <AddIcon />
            </Fab>
            <AddDialog
                shown={showDialog}
                formIndex={selectedIndex}
                cancelEvent={handleAddDialogClose}
                applyEvent={() => {
                    handleAddDialogClose();
                    handleRefresh();
                }}
            />
            <EditDialog
                shown={showEdit}
                formIndex={selectedIndex}
                cancelEvent={handleCancelEditDialog}
                applyEvent={handleApplyEditDialog}
                itemId={selectedToEdit}
            />
            <DeleteDialog
                shown={showDeleteAlert}
                cancelEvent={cancelDeleteAlert}
                applyEvent={indeedDeleteAlert}
            />
            <Drawer
                anchor={"right"}
                open={showModelDrawer}
                onClose={() => setShowModelDrawer(false)}
            >
                {listGenerator(constants.models, selectedIndex, (_, index) => {
                    setSelectedIndex(index);
                    setShowModelDrawer(false);
                })}
            </Drawer>
        </Container>
    );
}
