import { actionTypes } from "./actionTypes";

export interface IFilterAction {
    type: actionTypes.SET_FILTER;
    payload: string;
}
