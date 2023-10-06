import { actionTypes } from "@/types/actionTypes";
import { IfilterAction } from "@/types/filterDto";

const initialState = "ALL";

const filterReducer = (state = initialState, { type, payload }: IfilterAction) => {
    switch (type) {
        case actionTypes.SET_FILTER:
            return payload;
        default:
            return state;
    }
};
export default filterReducer;
