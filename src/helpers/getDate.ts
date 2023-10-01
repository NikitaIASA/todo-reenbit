import { format, addHours } from "date-fns";

export const getCurrentDate = () => {
    const currentDate = new Date();
    return format(currentDate, "dd.MM.yyyy HH:mm");
}

export const getEndDate = () => {
    const currentDate = new Date();
    const endDate = addHours(currentDate, 24);
    return format(endDate, "dd.MM.yyyy HH:mm");
}
