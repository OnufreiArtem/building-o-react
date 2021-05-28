import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {
    createMuiTheme,
    withStyles,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core/styles";
import { useStyles } from "../mainStyles";
import axios from "axios";
import { apiURL } from "../constants";

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
    },
    numberInPage: {
        margin: theme.spacing(2),
    },
    paperHeight: {
        height: theme.spacing(10),
    },
}));

export default function Home() {
    const mainClasses = useStyles();
    const classes = useHomeStyles();

    const [numberOfEmployees, setNumberOfEmployees] = React.useState(0);
    const [numberOfManagements, setNumberOfManagements] = React.useState(0);
    const [numberOfContracts, setNumberOfContracts] = React.useState(0);

    const fetchNumbersData = async () => {
        await axios.get(`${apiURL}/specials/main-numbers`).then(({ data }) => {
            setNumberOfEmployees(data.employeeNumber);
            setNumberOfManagements(data.managementNumber);
            setNumberOfContracts(data.contractsInProgress);
        });
    }

    React.useEffect(() => {
        fetchNumbersData();
    }, [numberOfEmployees, numberOfManagements, numberOfContracts]);

    return (
        <Container>
            <Typography variant="h3" className={classes.helloTitle}>
                Hello!
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper className={mainClasses.paper}>
                        <Typography
                            variant="h5"
                            align="center"
                            className={classes.numberInPage}
                        >
                            {numberOfEmployees}
                        </Typography>
                        <Typography variant="h6" align="center">
                            Employees
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={mainClasses.paper}>
                        <Typography
                            variant="h5"
                            align="center"
                            className={classes.numberInPage}
                        >
                            {numberOfManagements}
                        </Typography>
                        <Typography variant="h6" align="center">
                            Managements
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={mainClasses.paper}>
                        <Typography
                            variant="h5"
                            align="center"
                            className={classes.numberInPage}
                        >
                            {numberOfContracts}
                        </Typography>
                        <Typography variant="h6" align="center">
                            Contracts in Progress
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
