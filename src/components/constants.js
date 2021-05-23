import * as utils from './utils';


export const apiURL = "http://localhost:8080/api/v1";

export const mainLocations = ["Home", "...", "..."];

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
    "Estimate",
    "Machinery",
    "Machinery Storage",
    "Plot",
    "Request",
    "Schedule",
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
    plot: object.plot?.name || none,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
});

const alterManagement = (object) => ({
    ...object,
    chief: object.chief
        ? `${object.chief.name} ${object.chief.surname}`
        : none,
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
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
});

const alterEstimate = (object) => ({
    ...object,
    plot: object.plot?.name || none,
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

const alterSchedule = (object) => ({
    ...object,
    targetBuilding: object.targetBuilding?.plan || none,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
})

const alterScheduleEvent = (object) => ({
    ...object,
    buildingStep: object.buildingStep?.name || none,
    brigade: object.brigade?.name || none,
    brigade: object.brigade?.name || none,
    schedule: object.schedule === undefined ? none : object.schedule?.targetBuilding?.plan,
    beginning: utils.makeDateString(object.beginning),
    ending: utils.makeDateString(object.ending),
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
})

const alterSpending = (object) => ({
    ...object,
    estimate: object.estimate === undefined ? none : object.estimate?.plot?.address,
    createdAt: utils.makeDateTimeString(object.createdAt),
    modifiedAt: utils.makeDateTimeString(object.modifiedAt)
})


export const entities = {
    brigade: { name: "Brigade", apiPath: "/brigades", alter: alterBrigade },
    brigadeSpec: {
        name: "Brigade Specification",
        apiPath: "/brigade-specs",
        alter: defaultAlter,
    },
    building: { name: "Building", apiPath: "/buildings", alter: alterBuilding },
    buildingStep: { name: "Building Steps", apiPath: "/building-steps", alter: defaultAlter },
    management: { name: "Construction Management", apiPath: "/managements", alter: alterManagement },
    contract: { name: "Contract", apiPath: "/contracts", alter: alterContract},
    customer: { name: "Customer", apiPath: "/customers", alter: defaultAlter},
    employee: { name: "Employee", apiPath: "/employees", alter: alterEmployee },
    employeeSpec: {
        name: "Employee Specification",
        apiPath: "/employee-specs",
        alter: defaultAlter
    },
    estimate: { name: "Estimate", apiPath: "/estimates", alter: alterEstimate },
    machinery: { name: "Machinery", apiPath: "/machineries", alter: alterMachinery },
    storage: { name: "Machinery Storage", apiPath: "/machinery-storages", alter: defaultAlter },
    plot: { name: "Plot", apiPath: "/plots", alter: alterPlot },
    request: { name: "Request", apiPath: "/requests", alter: alterRequest },
    schedule: { name: "Schedule", apiPath: "/schedules", alter: alterSchedule },
    scheduleEvent: { name: "Schedule Event", apiPath: "/schedule-events", alter: alterScheduleEvent },
    spending: { name: "Spending", apiPath: "/spendings", alter: alterSpending },
};
