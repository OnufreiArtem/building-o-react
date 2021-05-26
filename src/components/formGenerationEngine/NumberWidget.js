import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { getError } from "./utils";

const BaseInput = props => {
  const { id, required, schema, value, onChange, rawErrors } = props;
  // console.log(value);
  return (
    <div>
      <TextField
        id={id}
        error={!!(rawErrors && rawErrors.length)}
        disabled={schema.disabled}
        label={schema.title}
        type={"number"}
        // to add a "*" in the label
        required={required}
        // null makes the component uncontrolled
        value={value || ""}
        // avoid the case of empty string considered as a value
        // and not trigerring required validation
        onChange={event => onChange(Number.parseInt(event.target.value) || null)}
        fillWidth
        autoComplete="nope"
        InputProps={{
          style: { fontSize: 22 },
          startAdornment: schema.prefix ? (
            <InputAdornment position="start" style={{ fontSize: 22 }}>
              {schema.prefix}
            </InputAdornment>
          ) : null,
          endAdornment: schema.suffix ? (
            <InputAdornment position="end" style={{ fontSize: 22 }}>
              {schema.suffix}
            </InputAdornment>
          ) : null
        }}
        InputLabelProps={{ style: { fontSize: 18 } }}
        style={{ width: "100%", margin: 0, marginBottom: 20 }}
        type={schema.format}
      />
      {getError(rawErrors)}
    </div>
  );
};

export default BaseInput;
