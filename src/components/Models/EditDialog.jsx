import React from "react";

import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Form from "../formGenerationEngine";
import * as constants from "../constants";
import { forms } from "../forms";
import * as utils from "../utils"
import axios from "axios";

const useFormStyles = makeStyles((theme) => ({
    formStyles: {
        padding: theme.spacing(5),
        border: "none",
    },
    formControl: {
        width: "300px",
        paddingBottom: theme.spacing(1),
    },
    divider: {
        height: theme.spacing(3),
    },
}));

const dummyProps = [
    [{ first: "", second: "No data" }],
    [{ first: "", second: "No data" }],
    [{ first: "", second: "No data" }],
    [{ first: "", second: "No data" }],
    [{ first: "", second: "No data" }],
    [{ first: "", second: "No data" }],
    [{ first: "", second: "No data" }],
];

export default function EditDialog({
    shown,
    cancelEvent,
    applyEvent,
    formIndex,
    itemId,
}) {
    const classes = useFormStyles();
    const [formProps, setFormProps] = React.useState(dummyProps);
    const [data, setData] = React.useState({});

    const onSubmit = ({ formData }) => {
        axios.put(constants.createEntityUrl(formIndex) + "/", {...data, ...formData});
        applyEvent();
    };

    const refreshDependencies = () => {
        dependencies(Object.entries(constants.entities)[formIndex][1].requires);
    };

    const fetchItemFromServer = () => {
        axios
            .get(
                `${constants.apiURL}${
                    Object.entries(constants.entities)[formIndex][1].apiPath
                }/${itemId}`
            )
            .then((res) => {
                setData(utils.makeValuesString(utils.makeFlat(res.data)));
            })
            .catch((err) => console.error(err));
    };

    React.useEffect(() => {
        if (shown) {
            refreshDependencies();
            fetchItemFromServer();
        }
    }, [shown]);

    const dependencies = (requirements) => {
        const promises = requirements.map((link) =>
            axios.get(constants.apiURL + link)
        );
        Promise.all(promises).then((response) => {
            console.log(response);
            setFormProps(response.map((r) => r.data));
        });
    };

    return (
        <Dialog open={shown} aria-labelledby="form-add-item">
            <Form
                title={`Edit ${
                    Object.entries(constants.entities)[formIndex][1].name
                }`}
                formData={data}
                onCancel={cancelEvent}
                className={classes.formStyles}
                schema={
                    formProps.length !==
                    Object.entries(constants.entities)[formIndex][1].requires
                        .length
                        ? forms[formIndex].scheme(dummyProps)
                        : forms[formIndex].scheme(formProps)
                }
                onSubmit={onSubmit}
                uiSchema={forms[formIndex].widget}
            />
        </Dialog>
    );
}
