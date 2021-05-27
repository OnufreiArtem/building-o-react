import * as utils from './utils';


export const apiURL = "http://localhost:8080/api/v1";

export const mainLocations = ["Home", "...", "..."];

export const createEntityUrl = (index) => apiURL + Object.entries(entities)[index][1].apiPath  

export const models = [
    "Brigade",
    "Brigade Specification",
    "Building",
    "Building Steps",
    "Construction Management",
    "Contract",
    "Customer",
    "Employee",
    "Employee Specification",
    // "Estimate",
    "Machinery",
    "Machinery Storage",
    "Plot",
    "Request",
    // "Schedule",
    "Schedule Event",
    "Spending",
];

const none = "Not specified";

const defaultAlter = (object) => ({
    ...object,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
})

const alterBrigade = (object) => ({
    ...object,
    chief: object.chief
        ? `${object.chief.name} ${object.chief.surname}`
        : none,
    specification: object.specification?.name || none,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
});
const alterBuilding = (object) => ({
    ...object,
    chief: object.chief
        ? `${object.chief.name} ${object.chief.surname}`
        : none,
    plot: object.plot?.address || none,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
});

const alterManagement = (object) => ({
    ...object,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
});

const alterContract = (object) => ({
    ...object,
    customer: object.customer?.name || none,
    plot: object.plot?.name || none,
    constructionManagement: object.constructionManagement?.name || none,
    projectFinishedDate: utils.makeDateString(object.projectFinishedDate),
    projectStartDate: utils.makeDateString(object.projectStartDate),
    signedDate: utils.makeDateString(object.signedDate),
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
});

const alterEmployee = (object) => ({
    ...object,
    specification: object.specification?.name || none,
    brigade: object.brigade?.name || none,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
});

const alterMachinery = (object) => ({
    ...object,
    machineryStorage: object.machineryStorage?.name || none,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
});

const alterPlot = (object) => ({
    ...object,
    chief: object.chief
        ? `${object.chief.name} ${object.chief.surname}`
        : none,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
});

const alterRequest = (object) => {
    let nObject = ({
        ...object,
        building: object.building?.plan || none,
        brigadeThatAsked: undefined,
        brigade: object.brigadeThatAsked?.name || none,
        constructionManagement: object.constructionManagement?.name || none,
        createdAt: utils.makeDateTimeString(object.createdAt),
        modifiedAt: utils.makeDateTimeString(object.modifiedAt)
    });
    delete nObject.brigadeThatAsked
    return nObject
} 

const alterScheduleEvent = (object) => ({
    ...object,
    buildingStep: object.buildingStep?.name || none,
    brigade: object.brigade?.name || none,
    brigade: object.brigade?.name || none,
    building: object.building === undefined ? none : object.building?.plan,
    beginning: utils.makeDateString(object.beginning),
    ending: utils.makeDateString(object.ending),
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
})

const alterSpending = (object) => ({
    ...object,
    building: object.building === undefined ? none : object.building?.plot?.address,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
})

export const entities = {
    brigade: { name: "Brigade", apiPath: "/brigades", alter: alterBrigade, requires: ["/employees/names", "/brigade-specs/names"] },
    brigadeSpec: {
        name: "Brigade Specification",
        apiPath: "/brigade-specs",
        alter: defaultAlter,
        requires: []
    },
    building: { name: "Building", apiPath: "/buildings", alter: alterBuilding, requires: ["/plots/addresses", "/employees/names"] },
    buildingStep: { name: "Building Steps", apiPath: "/building-steps", alter: defaultAlter, requires: [] },
    management: { name: "Construction Management", apiPath: "/managements", alter: alterManagement, requires: [] },
    contract: { name: "Contract", apiPath: "/contracts", alter: alterContract, requires: ["/customers/contacts", "/managements/addresses", "/plots/addresses"]},
    customer: { name: "Customer", apiPath: "/customers", alter: defaultAlter, requires: [] },
    employee: { name: "Employee", apiPath: "/employees", alter: alterEmployee, requires: ["/employee-specs/names", "/brigades/names"] },
    employeeSpec: {
        name: "Employee Specification",
        apiPath: "/employee-specs",
        alter: defaultAlter,
        requires: []
    },
    // estimate: { name: "Estimate", apiPath: "/estimates", alter: alterEstimate },
    machinery: { name: "Machinery", apiPath: "/machineries", alter: alterMachinery, requires: ["/machinery-storages/addresses"] },
    storage: { name: "Machinery Storage", apiPath: "/machinery-storages", alter: defaultAlter, requires: [] },
    plot: { name: "Plot", apiPath: "/plots", alter: alterPlot, requires: ["/employees/names"] },
    request: { name: "Request", apiPath: "/requests", alter: alterRequest, requires: ["/buildings/addresses", "/brigades/names", "/managements/addresses"] },
    // schedule: { name: "Schedule", apiPath: "/schedules", alter: alterSchedule },
    scheduleEvent: { name: "Schedule Event", apiPath: "/schedule-events", alter: alterScheduleEvent, requires: ["/buildings/addresses", "/building-steps/names", "/brigades/names"] },
    spending: { name: "Spending", apiPath: "/spendings", alter: alterSpending, requires: ["/buildings/addresses"] },
};
