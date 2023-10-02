import { format, addHours } from "date-fns";
import { DATE_FORMAT } from "@/consts/dateFormats";
import { ADD_ONE_DAY } from "@/consts/timeFrames";

export const getCurrentDate = () => {
    const currentDate = new Date();
    return format(currentDate, DATE_FORMAT);
}

export const getEndDate = () => {
    const currentDate = new Date();
    const endDate = addHours(currentDate, ADD_ONE_DAY);
    return format(endDate, DATE_FORMAT);
}
