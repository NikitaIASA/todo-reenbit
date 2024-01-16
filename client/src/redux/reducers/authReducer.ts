import { actionTypes } from "@/types/actionTypes";
import { IAuthActionList, IUser } from "@/types/authActionsTypes";

interface authState {
    loading: boolean,
    user: IUser | null;
    error: string | null;
    isAuth: boolean,
}

const initialState: authState = {
    loading: false,
    user: null,
    error: null,
    isAuth: false,
};

const authReducer = (state = initialState, action: IAuthActionList) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return { ...state, loading: true, error: null, isAuth: false };
        case actionTypes.LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload, isAuth: true };
        case actionTypes.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload, isAuth: false };
        case actionTypes.LOGOUT_SUCCESS:
            return { ...initialState };
        default:
            return state;
    }
};

export default authReducer;
