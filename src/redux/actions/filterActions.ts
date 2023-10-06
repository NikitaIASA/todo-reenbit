import { actionTypes } from "@/types/actionTypes";
import { IfilterAction } from "@/types/filterDto";

export const setFilter = (filter: string): IfilterAction => ({
    type: actionTypes.SET_FILTER,
    payload: filter
});
