import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getCurrentUserProfile } from "../actions/profileActions";

const ProfileScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const currentUserProfile = useSelector((state) => state.currentUserProfile);
    const { loading, error, profile } = currentUserProfile;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!userInfo) {
            history.push('/login')
        } else if (profile) {
            history.push('/feeds')
        } else {
            dispatch(getCurrentUserProfile());
        }
    }, [userInfo, profile, history]);

    return (
        <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome <span className="text-capitalize">{userInfo && userInfo.name}</span>
            </p>

            {loading ? <Loader /> : profile !== null ? (
                <>
                    {/* <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} /> */}

                    <div className="my-2">
                        <button className="btn btn-danger">
                            <i className="fas fa-user-minus" /> Delete My Account
            </button>
                    </div>
                </>
            ) : (
                    <>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </>
                )}
        </>
    );
};

export default ProfileScreen;

