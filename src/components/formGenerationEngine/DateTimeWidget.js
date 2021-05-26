import React from "react";
import {
    FormControl,
    FormLabel,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import "date-fns";
// import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
// import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
// import DateTimePicker from '@material-ui/lab/DateTimePicker';
import DateFnsUtils from "@date-io/date-fns";
import { getError } from "./utils";

const DateWidget = (props) => {
    const { id, required, schema, value, onChange, rawErrors } = props;
    return (
        <FormControl
            component="fieldset"
            disabled={schema.disabled}
            required={required}
            error={!!(rawErrors && rawErrors.length)}
            style={{ width: "100%", marginTop: 22 }}
        >
            <FormLabel style={{ fontSize: 22 }} component="legend">
                {schema.title}
            </FormLabel>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={Date.parse(value)}
                    onChange={(date) => {
                        console.log(date.toISOString());
                        onChange(date.toISOString());
                    }}
                />
            </LocalizationProvider> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id={id}
                    aria-label={schema.title}
                    name={schema.title}
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    value={Date.parse(value)}
                    onChange={(date) => {
                        console.log(date.toISOString());
                        onChange(date.toISOString());
                    }}
                />
            </MuiPickersUtilsProvider>

            {getError(rawErrors)}
        </FormControl>
    );
};

export default DateWidget;
