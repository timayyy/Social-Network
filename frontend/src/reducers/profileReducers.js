import {
    GET_CURRENT_USER_PROFILE_REQUEST,
    GET_CURRENT_USER_PROFILE_SUCCESS,
    GET_CURRENT_USER_PROFILE_FAIL,
    GET_CURRENT_USER_PROFILE_RESET
} from "../constants/profileConstants";

export const currentUserProfileReducer = (state = { profile: null }, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_PROFILE_REQUEST:
            return { ...state, loading: true };
        case GET_CURRENT_USER_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.payload };
        case GET_CURRENT_USER_PROFILE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case GET_CURRENT_USER_PROFILE_RESET:
            return { profile: null };
        default:
            return state;
    }
};