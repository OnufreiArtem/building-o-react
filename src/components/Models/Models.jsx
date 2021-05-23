import React from "react";

import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useStyles } from "../mainStyles";
import { listGenerator } from "../lists";
import * as constants from "../constants";
import BasicModelTable from "../model-table/ModelTable";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
        visibility: "visible"
    },
    notVisible: {
        visibility: "hidden"
    }
}));

export default function Models() {
    const mainClasses = useStyles();
    const classes = useModelsStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [showDialog, setShowDialog] = React.useState(false);
    const [dataList, setDataList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleAddDialogOpen = () => {
        setShowDialog(true);
    };

    const handleAddDialogClose = () => {
        setShowDialog(false);
    };

    const handleDelete = (env, data) => {
        deleteData(data.map(item => item.id))
        fetchData(true);
    }

    const fixedHeightPaper = clsx(mainClasses.paper, mainClasses.fixedHeight);
    
    const deleteData = async (ids) => {
        await ids.forEach(item => {
            axios.delete( `${constants.apiURL}${
                Object.values(constants.entities)[selectedIndex].apiPath
            }/${item}`).then(response => console.log(response)).catch(error => console.log(error))
        });
        
    }

    const fetchData = async (mounted) => {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        await sleep(2000);
        await axios
            .get(
                `${constants.apiURL}${
                    Object.values(constants.entities)[selectedIndex].apiPath
                }/`
            )
            .then((response) => {
                if (mounted) {
                    console.log(response.data)
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
        let isMounted = true;
        setLoading(true);
        fetchData(isMounted);
        return () => {
            isMounted = false;
        };
    }, [selectedIndex]);

    return (
        <Container maxWidth="lg" className={mainClasses.container}>
            {/* <Typography variant="h3" component="h2" className={classes.title}>
                Hello
            </Typography> */}
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper height={fixedHeightPaper} className={classes.paper}>
                        <LinearProgress className={loading ? classes.visible : classes.notVisible} />
                        <BasicModelTable
                                listOfData={dataList}
                                title={
                                    Object.values(constants.entities)[
                                        selectedIndex
                                    ].name
                                }
                                onDelete={handleDelete}
                            />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography
                            variant="h6"
                            className={classes.modelListTitle}
                        >
                            Choose your model
                        </Typography>
                        <Divider />
                        {listGenerator(
                            constants.models,
                            selectedIndex,
                            (_, index) => setSelectedIndex(index)
                        )}
                    </Paper>
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

            <Dialog
                open={showDialog}
                onClose={() => handleAddDialogClose()}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* To subscribe to this website, please enter your email
                        address here. We will send updates occasionally. */}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleAddDialogClose()}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => {}} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
