import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";

const useinfoStyles = makeStyles((theme) => ({
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
        textDecoration: 'none',
        margin: theme.spacing(2),
    },
}));

export default function Info() {
    const classes = useinfoStyles();

    return (
        <Container>
            <Typography variant="h3" className={classes.helloTitle}>
                Hello!
            </Typography>

            <Typography>
                This is an application for building organization. This project
                is powered with Spring Boot and React.
            </Typography>
            <Link href="#" underlineNone>
                <Button
                    className={classes.btnMargin}
                    variant="contained"
                    color="primary"
                >
                    See my GitHub
                </Button>
            </Link>
            <Link href="#" underlineNone>
                <Button
                    className={classes.btnMargin}
                    variant="contained"
                    color="secondary"
                >
                    See Swagger
                </Button>
            </Link>

            <Typography>Developed by Artem Onufrei</Typography>
        </Container>
    );
}
