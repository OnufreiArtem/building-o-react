import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { BrigadeForm } from "./Forms";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import * as yup from "yup";

import * as constants from "../constants";
import axios from "axios";

let schema = yup.object().shape({
    name: yup.string().max(10, "Invalid length").required('Required'),
    description: yup.string().required(),
    chief: yup.string().required(),
    specification: yup.string().required(),
    active: yup.boolean().required(),
});

const useFormStyles = makeStyles((theme) => ({
    formStyles: {
        padding: theme.spacing(5),
    },
    formControl: {
        width: "300px",
        paddingBottom: theme.spacing(1),
    },
    divider: {
        height: theme.spacing(3),
    },
}));

export default function AddDialog({ shown, cancelEvent, applyEvent }) {
    const classes = useFormStyles();
    const { register, handleSubmit, errors } = useForm({ 
        validationSchema: schema,
    });
    const [specifications, setSpecifications] = React.useState([]);
    const [chiefs, setChiefs] = React.useState([]);
    
    React.useEffect(() => {
        (async () => {
            await axios
                .get(`${constants.apiURL}/brigade-specs/names`)
                .then((response) => {
                    setSpecifications(response.data);
                })
                .catch((_) => console.log("Error fetching data"));
        })();
        (async () => {
            await axios
                .get(`${constants.apiURL}/employees/names`)
                .then((response) => {
                    setChiefs(response.data);
                })
                .catch((_) => console.log("Error fetching data"));
        })();
    }, []);

    return (
        <Dialog
            open={shown}
            onClose={cancelEvent}
            aria-labelledby="form-add-item"
        >
            <form
                onSubmit={handleSubmit((data) => {
                    (async () => {
                        const employee = await axios.get(
                            `${constants.apiURL}/employees/` + data.chief
                        );
                        const spec = await axios.get(
                            `${constants.apiURL}/brigade-specs/` +
                                data.specification
                        );
                        const nData = {
                            ...data,
                            specification: spec.data === '' ? null : spec.data,
                            chief: employee.data === '' ? null : employee.data,
                        };
                        await axios.post(
                            `${constants.apiURL}/brigades/`,
                            nData
                        );
                    })();
                    applyEvent();
                    console.log("Hele");
                })}
            >
                <DialogTitle id="form-add-item">Add</DialogTitle>
                <DialogContent>
                    <TextField
                        error={errors.name ? true : false}
                        fullWidth
                        inputRef={register}
                        label="Name"
                        name={"name"}
                        className={classes.formControl}
                        variant="outlined"
                        helperText={errors.name ? errors.name.message : ""}
                    />
                    {/* {errors.name && <FormControlLabel>Invalid Name</FormControlLabel>} */}
                    {errors.name && <div>{errors.name.message}</div>}
                    <div className={classes.divider} />
                    <TextField
                        fullWidth
                        inputRef={register}
                        label="Description"
                        name={"description"}
                        className={classes.formControl}
                        variant="outlined"
                    />
                    <div className={classes.divider} />
                    <FormControl>
                        <InputLabel htmlFor="select-specification">
                            Specification
                        </InputLabel>
                        <Select
                            id="select-specification"
                            inputRef={register}
                            name="specification"
                            className={classes.formControl}
                            defaultValue=""
                        >
                            <MenuItem value="">None</MenuItem>
                            {specifications.map((spec) => (
                                <MenuItem key={nanoid()} value={spec.first}>
                                    {spec.second}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className={classes.divider} />
                    <FormControl>
                        <InputLabel htmlFor="select-chief">Chief</InputLabel>
                        <Select
                            id="select-chief"
                            inputRef={register}
                            name="chief"
                            className={classes.formControl}
                            defaultValue=""
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {chiefs.map((chief) => (
                                <MenuItem key={nanoid()} value={chief.first}>
                                    {chief.second}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className={classes.divider} />
                    <FormControlLabel
                        control={
                            <Checkbox
                                inputRef={register}
                                name="active"
                                value={false}
                            />
                        }
                        label="Active"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelEvent} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit" color="primary">
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
