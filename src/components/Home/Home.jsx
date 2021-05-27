import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
    createMuiTheme,
    withStyles,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core/styles";
import { useStyles } from "../mainStyles";

const useHomeStyles = makeStyles((theme) => ({
    title: {},
    modelListTitle: {
        padding: theme.spacing(3),
    },
    helloTitle: {
        marginBottom: theme.spacing(4),
    },
    contentText: {
        marginBottom: theme.spacing(4),
    },
    btnMargin: {
        margin: theme.spacing(2),
    }
}));

export default function Home() {
    const classes = useHomeStyles();

    return (
        <Container>
            <Typography variant="h3" className={classes.helloTitle}>
                Hello!
            </Typography>

            <Typography>
                This is an application for building organization. This project
                is powered with Spring Boot and React.
            </Typography>
            <Button className={classes.btnMargin} variant="contained" color="primary">See my GitHub</Button>
            <Button className={classes.btnMargin} variant="contained" color="secondary">
                See Swagger
            </Button>

            <Typography>Developed by Artem Onufrei</Typography>
        </Container>
    );
}
