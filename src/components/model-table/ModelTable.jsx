import React from "react";

import MaterialTable from "material-table";

import * as utils from "../utils";

export default function BasicModelTable({ listOfData, title, onDelete, onEdit }) {
    console.log(listOfData ? listOfData[0] : undefined);
    return (
            <MaterialTable
                columns={utils.generateColumns(listOfData ? listOfData[0] : undefined)}
                options={{
                    selection: true,
                    headerStyle: {
                        whiteSpace: "nowrap",
                    },
                    rowStyle: {
                        whiteSpace: "nowrap",
                    },
                }}
                data={listOfData}
                title={title}
                actions={[
                    {
                      tooltip: 'Remove All Selected Users',
                      icon: 'delete',
                      onClick: onDelete
                    }
                  ]}
            />
            
    );
}
