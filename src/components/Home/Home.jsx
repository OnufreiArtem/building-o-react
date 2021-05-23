import React from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useStyles } from "../mainStyles";

const useHomeStyles = makeStyles((theme) => ({
    title: {},
    modelListTitle: {
        padding: theme.spacing(3),
    },
}));

export default function Home() {
    return <Container>
        <Typography>Hello</Typography>
    </Container>;
}