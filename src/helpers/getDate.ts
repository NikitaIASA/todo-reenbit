import { format, addHours, addMinutes, startOfDay, isSameDay, addDays, endOfDay } from "date-fns";
import { DATE_FORMAT } from "@/consts/dateFormats";
import { ADD_ONE_DAY, ADD_FIVE_MINUTES, ADD_24_HOURS } from "@/consts/timeFrames";

export const getCurrentDate = () => {
    const currentDate = new Date();
    return format(currentDate, DATE_FORMAT);
}

export const getEndDate = () => {
    const currentDate = new Date();
    const endDate = addHours(currentDate, ADD_24_HOURS);
    return format(endDate, DATE_FORMAT);
}

export const getMinDate = (date: Date | null): Date => {
    const currentDate = new Date();

    if (!date) {
        return addMinutes(currentDate, ADD_FIVE_MINUTES);
    }

    const currentDayStart = startOfDay(currentDate);
    const dateDayStart = startOfDay(date);

    if (isSameDay(date, currentDate)) {
        return addMinutes(currentDate, ADD_FIVE_MINUTES);
    }

    if (dateDayStart > currentDayStart) {
        return startOfDay(date);
    }

    return addMinutes(currentDate, ADD_FIVE_MINUTES);
}

export const getMaxDate = (date: Date) => {
    const nextDay = addDays(date, ADD_ONE_DAY);
    return endOfDay(nextDay);
}
