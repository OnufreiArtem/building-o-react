import React from "react";

import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Form from "../formGenerationEngine";
import * as constants from "../constants";
import { forms } from "../forms";
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
]

export default function AddDialog({
    shown,
    cancelEvent,
    applyEvent,
    formIndex,
}) {
    const classes = useFormStyles();
    const [formProps, setFormProps] = React.useState(dummyProps) 

    const onSubmit = ({ formData }) => {
        axios.post(constants.createEntityUrl(formIndex) + '/', formData);
        applyEvent();
    };

    const refreshDependencies = () => {
        dependencies(Object.entries(constants.entities)[formIndex][1].requires)
    }

    React.useEffect(() => {
        if(shown) {
            refreshDependencies();
        }
    }, [shown])

    const dependencies = (requirements) => {
        const promises = requirements.map(link => axios.get(constants.apiURL + link));
        Promise.all(promises).then(response => {console.log(response); setFormProps(response.map(r => r.data))});
    }

    return (
        <Dialog open={shown} aria-labelledby="form-add-item">
            
            <Form
                title={`Add ${
                    Object.entries(constants.entities)[formIndex][1].name
                }`}
                onCancel={cancelEvent}
                className={classes.formStyles}
                schema={formProps.length !== Object.entries(constants.entities)[formIndex][1].requires.length ? forms[formIndex].scheme(dummyProps) : forms[formIndex].scheme(formProps)}
                onSubmit={onSubmit}
                uiSchema={forms[formIndex].widget}
            />
        </Dialog>
    );
}

/*
{formIndex !== undefined ? (
    <Form
    title={`Add ${
        Object.entries(constants.entities)[formIndex].name
    }`}
    onCancel={cancelEvent}
    className={classes.formStyles}
    schema={forms[formIndex].schema(
        Object.entries(constants.entities)[
            formIndex
        ][1].requires.map((path) => {
            let value = [];
            (async () => {
                const r = await axios.get(constants.apiURL + path)
                value = r.data
            })();
            return value;
        })
    )}
    onSubmit={onSubmit}
    uiSchema={forms[formIndex].widget}
/>
) : <span>Error creating add dialog</span>} 
*/
