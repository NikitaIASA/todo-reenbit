import { actionTypes } from "@/types/actionTypes";
import { IFilterAction } from "@/types/filterDto";

const initialState = "ALL";

const filterReducer = (state = initialState, { type, payload }: IFilterAction) => {
    switch (type) {
        case actionTypes.SET_FILTER:
            return payload;
        default:
            return state;
    }
};
export default filterReducer;
