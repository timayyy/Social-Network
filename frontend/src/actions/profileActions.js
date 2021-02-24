import axios from "axios";
import {
    GET_CURRENT_USER_PROFILE_REQUEST,
    GET_CURRENT_USER_PROFILE_SUCCESS,
    GET_CURRENT_USER_PROFILE_FAIL
} from "../constants/profileConstants";

export const getCurrentUserProfile = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_CURRENT_USER_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            "/api/profile", config
        );

        dispatch({
            type: GET_CURRENT_USER_PROFILE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: GET_CURRENT_USER_PROFILE_FAIL,
            payload:
                error.response && error.response.data.errors
                    ? error.response.data.errors : error.response && error.response.data ? error.response.data
                        : error.message
        });
    }
};