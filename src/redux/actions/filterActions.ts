import { actionTypes } from "@/types/actionTypes";
import { IFilterAction } from "@/types/filterDto";

export const setFilter = (filter: string): IFilterAction => ({
    type: actionTypes.SET_FILTER,
    payload: filter
});
