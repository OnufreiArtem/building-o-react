import React from "react";

import MaterialTable from "material-table";

import * as utils from "../utils";

export default function BasicModelTable({
    listOfData,
    title,
    noActions = false,
    onDelete,
    onEdit,
}) {
    return (
        <MaterialTable
            columns={utils.generateColumns(
                listOfData ? listOfData[0] : undefined
            )}
            options={{
                // selection: true,
                headerStyle: {
                    whiteSpace: "nowrap",
                },
                rowStyle: {
                    whiteSpace: "nowrap",
                },
            }}
            data={listOfData}
            title={title}
            actions={
                !noActions
                    ? [
                          {
                              tooltip: "Remove All Selected Items",
                              icon: "delete",
                              onClick: onDelete,
                          },
                          {
                              tooltip: "Edit Selected Item",
                              icon: "edit",
                              onClick: onEdit,
                          },
                      ]
                    : []
            }
        />
    );
}
