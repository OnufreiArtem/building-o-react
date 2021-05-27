import React from "react";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { getError } from "./utils";

const DateTimeWidget = (props) => {
    const { id, required, schema, value, onChange, rawErrors } = props;
    return (
        <FormControl
            component="fieldset"
            disabled={schema.disabled}
            required={required}
            error={!!(rawErrors && rawErrors.length)}
            style={{ width: "100%", marginTop: 18 }}
        >
            <FormLabel style={{ fontSize: 18 }} component="legend">
                {schema.title}
            </FormLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id={id}
                    aria-label={schema.title}
                    name={schema.title}
                    variant="inline"
                    margin="normal"
                    value={Date.parse(value)}
                    onChange={(date) => onChange(date.toISOString())}
                />
            </MuiPickersUtilsProvider>

            {getError(rawErrors) && getError(rawErrors)[0]}
        </FormControl>
    );
};

export default DateTimeWidget;
