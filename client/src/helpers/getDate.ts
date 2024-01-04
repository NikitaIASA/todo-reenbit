import { format, addHours, addMinutes, startOfDay, isSameDay, addDays, endOfDay, formatISO, parseISO } from "date-fns";
import { DATE_FORMAT } from "@/consts/dateFormats";
import { ONE_DAY, FIVE_MINUTES, TWENTY_FOUR_HOURS } from "@/consts/timeFrames";

export const getCurrentDateISO = () => {
    const currentDate = new Date();
    return formatISO(currentDate);
}

export const getEndDateISO = () => {
    const currentDate = new Date();
    const endDate = addHours(currentDate, TWENTY_FOUR_HOURS);
    return formatISO(endDate);
}

export const formatDate = (dateString: string) => {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, DATE_FORMAT);
};

export const getMinDate = (date: Date | null): Date => {
    const currentDate = new Date();

    if (!date) {
        return addMinutes(currentDate, FIVE_MINUTES);
    }

    const currentDayStart = startOfDay(currentDate);
    const dateDayStart = startOfDay(date);

    if (isSameDay(date, currentDate)) {
        return addMinutes(currentDate, FIVE_MINUTES);
    }

    if (dateDayStart > currentDayStart) {
        return startOfDay(date);
    }

    return addMinutes(currentDate, FIVE_MINUTES);
}

export const getMaxDate = (date: Date) => {
    const nextDay = addDays(date, ONE_DAY);
    return endOfDay(nextDay);
}
