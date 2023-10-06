import { actionTypes } from "./actionTypes";

export interface IfilterAction {
    type: actionTypes.SET_FILTER;
    payload: string;
}