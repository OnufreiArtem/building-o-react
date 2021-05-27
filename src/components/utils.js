export const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

export const generateColumns = (object) => {
    if (object === undefined) return [];
    const keys = Object.keys(object);
    return keys
        .filter((k) => k !== "tableData")
        .map((key) => ({ title: capitalize(key), field: key }));
};

export const makeFlat = (obj) => {
    console.log(obj);
    return Object.entries(obj).reduce(
        (acc, curr) => {
            if (typeof curr[1] === "object" && curr[1] !== null) acc[curr[0]] = curr[1].id;

            return acc;
        },
        { ...obj }
    );
}
    

export const makeValuesString = (obj) =>
    Object.entries(obj).reduce(
        (acc, curr) => {
            if(typeof curr[1] !== 'boolean' && typeof curr[1] !== 'number') acc[curr[0]] = `${curr[1]}`;
            return acc;
        },
        { ...obj }
    );

export const makeDateTimeString = (localDateTime) => localDateTime;
export const makeDateString = (localDate) => localDate;
