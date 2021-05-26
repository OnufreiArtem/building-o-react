import React from "react";
import { Button, Typography } from "@material-ui/core";
import MForm from "react-jsonschema-form";
import BaseInput from "./BaseInput";
import SelectWidget from "./SelectWidget";
import CheckboxWidget from "./CheckboxWidget";
import DateWidget from "./DateWidget";
import NumberWidget from "./NumberWidget";
import FieldTemplate from "./FieldTemplate";
import RadioWidget from "./RadioWidget";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const widgets = {
    BaseInput,
    SelectWidget,
    CheckboxWidget,
    RadioWidget,
    DateWidget,
    number: NumberWidget,
};

const Form = ({
    title,
    formData={},
    onCancel,
    onSubmit,
    uiSchema = {},
    schema,
    liveValidate = true,
}) => {
    return (
        <div style={{  }}>
            <DialogTitle><Typography variant="h4" component="h5" align="center">{title}</Typography></DialogTitle>
            <DialogContent>
                <MForm
                    formData={formData}
                    style={{width: 500,}}
                    noHtml5Validate
                    FieldTemplate={FieldTemplate}
                    schema={schema}
                    uiSchema={uiSchema}
                    widgets={widgets}
                    showErrorList={false}
                    liveValidate={liveValidate}
                    onSubmit={onSubmit}
                >
                    <DialogActions>
                        <Button
                            onClick={onCancel}
                            variant="outlined"
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </MForm>
            </DialogContent>
        </div>
    );
};

export default Form;
