export const forms = [
    /* Brigade */
    {
        scheme: (props) => ({
            type: "object",
            required: ["name", "specification", "chief"],
            properties: {
                name: {
                    type: "string",
                    title: "Brigade name",
                },
                description: {
                    type: "string",
                    title: "Description",
                },
                chief: {
                    type: "string",
                    title: "Chief",
                    anyOf: props[0].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                specification: {
                    type: "string",
                    title: "Specification",
                    anyOf: props[1].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                active: {
                    type: "boolean",
                    title: "Active",
                },
            },
        }),

        widget: {},
    },
    /* Brigade Specification */
    {
        scheme: (props) => ({
            type: "object",
            required: ["name"],
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                },
                description: {
                    type: "string",
                    title: "Description",
                },
            },
        }),

        widget: {},
    },
    /* Building */
    {
        scheme: (props) => ({
            type: "object",
            required: ["chief", "plan", "plot"],
            properties: {
                chief: {
                    type: "string",
                    title: "Chief",
                    anyOf: props[1].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                plan: {
                    type: "string",
                    title: "Plan",
                },
                plot: {
                    type: "string",
                    title: "Plot",
                    anyOf: props[0].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
            },
        }),

        widget: {},
    },
    /* Building Step */
    {
        scheme: (props) => ({
            type: "object",
            required: ["name"],
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                },
                description: {
                    type: "string",
                    title: "Description",
                },
            },
        }),

        widget: {},
    },
    /* Construction Management */
    {
        scheme: (props) => ({
            type: "object",
            required: ["name", "address"],
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                },
                description: {
                    type: "string",
                    title: "Description",
                },
                address: {
                    type: "string",
                    title: "Address",
                },
            },
        }),

        widget: {},
    },
    /* Contract */
    {
        scheme: (props) => ({
            type: "object",
            required: [
                "constructionManagement",
                "plot",
                "customer",
                "price",
                "signedDate",
            ],
            properties: {
                constructionManagement: {
                    type: "string",
                    title: "Management",
                    anyOf: props[1].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                plot: {
                    type: "string",
                    title: "Plot",
                    anyOf: props[2].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                customer: {
                    type: "string",
                    title: "Customer",
                    anyOf: props[0].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                failed: {
                    type: "boolean",
                    title: "Failed",
                },
                finished: {
                    type: "boolean",
                    title: "Finished",
                },
                price: {
                    type: "string",
                    title: "Price",
                },
                signedDate: {
                    type: "string",
                    title: "Signed date",
                    format: "date",
                },
                projectStartDate: {
                    type: "string",
                    title: "Start date",
                },
                projectFinishedDate: {
                    type: "string",
                    title: "Finish date",
                    format: "date",
                },
            },
        }),

        widget: {
            projectStartDate: {
                "ui:widget": "date",
            },
            projectFinishedDate: {
                "ui:widget": "date",
            },
            signedDate: {
                "ui:widget": "date",
            },
        },
    },
    /* Customer */
    {
        scheme: (props) => ({
            type: "object",
            required: [
                "name",
                "type",
                "contactName",
                "contactSurname",
                "contactEMail",
            ],
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                },
                type: {
                    type: "string",
                    title: "Type",
                    anyOf: [
                        {
                            type: "string",
                            title: "Person",
                            enum: ["PERSON"],
                        },
                        {
                            type: "string",
                            title: "Organization",
                            enum: ["ORGANIZATION"],
                        },
                        {
                            type: "string",
                            title: "Company",
                            enum: ["COMPANY"],
                        },
                    ],
                },
                contactName: {
                    type: "string",
                    title: "Contact Name",
                },
                contactSurname: {
                    type: "string",
                    title: "Contact Surname",
                },
                contactPhoneNumber: {
                    type: "string",
                    title: "Contact Phone Number",
                },
                contactEMail: {
                    type: "string",
                    title: "Contact Email",
                },
            },
        }),

        widget: {},
    },
    /* Employee */
    {
        scheme: (props) => ({
            type: "object",
            required: [
                "name",
                "surname",
                "specification",
                "dateOfBirth",
                "email",
                "salary",
                "hiredDate",
            ],
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                },
                surname: {
                    type: "string",
                    title: "Surname",
                },
                specification: {
                    type: "string",
                    title: "Specification",
                    anyOf: props[0].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                dateOfBirth: {
                    type: "string",
                    title: "Date Of Birth",
                    format: "date",
                },
                brigade: {
                    type: "string",
                    title: "Brigade",
                    anyOf: props[1].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                email: {
                    type: "string",
                    title: "Email",
                },
                phoneNumber: {
                    type: "string",
                    title: "Phone Number",
                },
                salary: {
                    type: "number",
                    title: "Salary",
                },
                active: {
                    type: "boolean",
                    title: "Active",
                },
                hiredDate: {
                    type: "string",
                    title: "HiredDate",
                },
                firedDate: {
                    type: "string",
                    title: "FiredDate",
                    defaultValue: "",
                },
            },
        }),

        widget: {
            salary: {
                "ui:widget": "number",
            },
            dateOfBirth: {
                "ui:widget": "date",
            },
            hiredDate: {
                "ui:widget": "date",
            },
            firedDate: {
                "ui:widget": "date",
            },
        },
    },
    /* Employee Specification */
    {
        scheme: (props) => ({
            type: "object",
            required: ["name", "description"],
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                },
                description: {
                    type: "string",
                    title: "Description",
                },
                type: {
                    type: "string",
                    title: "Type",
                    anyOf: [
                        {
                            type: "string",
                            title: "Person",
                            enum: ["ENGINEER"],
                        },
                        {
                            type: "string",
                            title: "Organization",
                            enum: ["GENERAL"],
                        },
                    ],
                },
            },
        }),

        widget: {},
    },
    /* Machinery */
    {
        scheme: (props) => ({
            type: "object",
            required: ["number", "model", "usage", "year", "machineryStorage"],
            properties: {
                number: {
                    type: "string",
                    title: "Number",
                },
                model: {
                    type: "string",
                    title: "Model",
                },
                description: {
                    type: "string",
                    title: "Description",
                },
                usage: {
                    type: "string",
                    title: "Usage",
                },
                year: {
                    type: "string",
                    title: "Year",
                },
                inUsage: {
                    type: "boolean",
                    title: "In Usage",
                },
                machineryStorage: {
                    type: "string",
                    title: "MachineryStorage",
                    anyOf: props[0].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                active: {
                    type: "boolean",
                    title: "Active",
                },
            },
        }),

        widget: {},
    },
    /* Machinery Storage */
    {
        scheme: (props) => ({
            type: "object",
            required: ["name", "address"],
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                },
                address: {
                    type: "string",
                    title: "Address",
                },
                description: {
                    type: "string",
                    title: "Description",
                },
            },
        }),
        widget: {},
    },
    /* Plot */
    {
        scheme: (props) => ({
            type: "object",
            required: ["address"],
            properties: {
                address: {
                    type: "string",
                    title: "Address",
                },
                chief: {
                    type: "string",
                    title: "Chief",
                    anyOf: props[0].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
            },
        }),
        widget: {},
    },
    /* Request */
    {
        scheme: (props) => ({
            type: "object",
            required: [
                "title",
                "type",
                "building",
                "constructionManagement",
                "date",
                "brigadeThatAsked",
            ],
            properties: {
                title: {
                    type: "string",
                    title: "Title",
                },
                description: {
                    type: "string",
                    title: "Description",
                },
                type: {
                    type: "string",
                    title: "Type",
                    anyOf: [
                        {
                            type: "string",
                            title: "Resource",
                            enum: ["RESOURCE"],
                        },
                        {
                            type: "string",
                            title: "Machinery",
                            enum: ["MACHINERY"],
                        },
                    ],
                },
                building: {
                    type: "string",
                    title: "Buildinge",
                    anyOf: props[0].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                constructionManagement: {
                    type: "string",
                    title: "Construction Management",
                    anyOf: props[2].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                date: {
                    type: "string",
                    title: "Date",
                    format: "date",
                },
                satisfied: {
                    type: "boolean",
                    title: "Satisfied",
                },
                brigadeThatAsked: {
                    type: "string",
                    title: "Brigade That Asked",
                    anyOf: props[1].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
            },
        }),

        widget: {
            date: {
                "ui:widget": "date",
            },
        },
    },
    /* Schedule Event */
    {
        scheme: (props) => ({
            type: "object",
            required: [
                "name",
                "description",
                "building",
                "brigade",
                "buildingStep",
                "beginning",
                "ending",
            ],
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                },
                description: {
                    type: "string",
                    title: "Description",
                },
                building: {
                    type: "string",
                    title: "Building",
                    anyOf: props[0].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                brigade: {
                    type: "string",
                    title: "Brigade",
                    anyOf: props[2].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                buildingStep: {
                    type: "string",
                    title: "Building Step",
                    anyOf: props[1].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                beginning: {
                    type: "string",
                    title: "Beginning",
                },
                ending: {
                    type: "string",
                    title: "Ending",
                },
            },
        }),

        widget: {
            beginning: {
                "ui:widget": "datetime",
            },
            ending: {
                "ui:widget": "datetime",
            },
        },
    },
    /* Spending */
    {
        scheme: (props) => ({
            type: "object",
            required: ["name", "price", "count", "building", "requestDate"],
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                },
                description: {
                    type: "string",
                    title: "Description",
                },
                price: {
                    type: "number",
                    title: "Price",
                },
                count: {
                    type: "number",
                    title: "Count",
                },
                building: {
                    type: "string",
                    title: "Building",
                    anyOf: props[0].map((data) => ({
                        type: "string",
                        title: data.second,
                        enum: [data.first],
                    })),
                },
                requestDate: {
                    type: "string",
                    title: "Request Date",
                    format: "date",
                },
                satisfiedDate: {
                    type: "string",
                    title: "Satisfied Date",
                    format: "date",
                },
            },
        }),

        widget: {
            count: {
                "ui:widget": "number",
            },
            price: {
                "ui:widget": "number",
            },
            requestDate: {
                "ui:widget": "date",
            },
            satisfiedDate: {
                "ui:widget": "date",
            },
        },
    },
];
