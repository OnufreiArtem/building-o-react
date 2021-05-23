import React from "react";

import MaterialTable from "material-table";
import Container from "@material-ui/core/Container"
export default function BasicModelTable({data}) {
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const generateCols = (keys) => {
        const result = keys.map((key) => ({ title: capitalize(key), field: key }));
        return result.filter( r => r.title !== "CreatedAt" && r.title !== "ModifiedAt" )
    }
        

    return (
        <Container width="sm">
            <MaterialTable
                columns={generateCols(Object.keys(!data || !data[0] ? {} : data[0]))}
                options={{
                    selection: true,
                }}
                data={data}
                title="Some Title"
            />
        </Container>
    );
}
