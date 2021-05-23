import React from "react";

import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useStyles } from "../mainStyles";
import { listGenerator } from "../lists";
import * as constants from "../constants";

const useHomeStyles = makeStyles((theme) => ({
    title: {
    },
    modelListTitle: {
        padding: theme.spacing(3),
    }
}));

export default function Home() {
    const mainClasses = useStyles();
    const classes = useHomeStyles();
    const fixedHeightPaper = clsx(mainClasses.paper, mainClasses.fixedHeight);

    return (
        <Container maxWidth="md" className={mainClasses.container}>
            <Typography variant="h3" component="h2" className={classes.title}>
                Hello
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography variant='h6' className={classes.modelListTitle}>Choose your model</Typography>
                        <Divider />
                        {listGenerator(constants.models)}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

//            <Typography variant="h3" component="h2" className={classes.title}>Hello</Typography>
//            <Typography variant="h5" component="h3">This is building organization application. Developed by Artem Onufrei</Typography>
