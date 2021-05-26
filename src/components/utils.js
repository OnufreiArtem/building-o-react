export const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

export const generateColumns = (object) => {
    if (object === undefined) return [];
    const keys = Object.keys(object);
    return keys
        .filter((k) => k !== "tableData")
        .map((key) => ({ title: capitalize(key), field: key }));
};

export const makeFlat = (obj) =>
    Object.entries(obj).reduce(
        (acc, curr) => {
            if (typeof curr[1] === "object") acc[curr[0]] = curr[1].id;

            return acc;
        },
        { ...obj }
    );

export const makeDateTimeString = (localDateTime) => localDateTime; //`${new Date(...localDateTime.slice(0, 6)).toISOString()}`
export const makeDateString = (localDate) => localDate; //`${new Date(...localDate.slice(0, 3)).toDateString()}`
