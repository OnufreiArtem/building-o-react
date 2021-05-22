import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from "../mainStyles";

const useModelsStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
    }
}));

export default function Models() {
    const mainClasses = useStyles();
    const classes = useModelsStyles();

    return (
        <Container maxWidth="md" className={mainClasses.container}>
            <Typography variant="h4" component="h4" className={classes.title}>Choose Model</Typography>
        </Container>
    )
}