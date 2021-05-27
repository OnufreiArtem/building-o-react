import React from "react";
import {
    FormControl,
    FormLabel,
} from "@material-ui/core";
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { getError } from "./utils";

const DateWidget = (props) => {
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
                    format="yyyy-MM-dd"
                    margin="normal"
                    value={Date.parse(value || " ")}
                    onChange={(date) => {console.log(date !== null ? date.toISOString().slice(0, 10) : null); onChange(date !== null ? date.toISOString().slice(0, 10) : null)}}
                />
            </MuiPickersUtilsProvider>

            {getError(rawErrors) && getError(rawErrors)[0]}
        </FormControl>
    );
};

export default DateWidget;
