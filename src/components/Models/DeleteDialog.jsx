import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default function DeleteDialog({ shown, cancelEvent, applyEvent }) {
    return (
        <Dialog
            open={shown}
            onClose={cancelEvent}
            aria-labelledby="form-delete-item"
        >
            <DialogTitle id="form-delete-item">Delete selection</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure, you want to delete this item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelEvent} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={applyEvent} color="primary">
                    Yes, Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
