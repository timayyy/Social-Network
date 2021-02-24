import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        //LOGOUT
        dispatch(logout());
    }
    return (
        <header class="header fixed-top">
            <div class="branding">
                <div class="container position-relative">
                    <nav class="navbar navbar-expand-lg">
                        <div class="site-logo">
                            <Link class="navbar-brand" to="/">
                                <span class="logo-text">MeetDev</span>
                            </Link>
                        </div>

                        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                            <span> </span>
                            <span> </span>
                            <span> </span>
                        </button>

                        <div class="collapse navbar-collapse py-3 py-lg-0" id="navigation">
                            <ul class="navbar-nav ml-lg-auto">
                                <>
                                    <li class="nav-item mr-lg-4">
                                        <Link class="nav-link" to="/feeds">feeds</Link>
                                    </li>
                                    <li class="nav-item mr-lg-4">
                                        <Link class="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li class="nav-item mr-lg-0 mt-3 mt-lg-0">
                                        <Link class="btn custom-btn-primary text-white" to="/signup">Sign up</Link>
                                    </li>
                                    {userInfo && (<LinkContainer to='/login'>
                                        <button class="btn custom-btn-primary text-white" onClick={logoutHandler}>Logout</button>
                                    </LinkContainer>)}
                                </>
                            </ul>
                        </div>
                    </nav>

                </div>
            </div>
        </header>
    )
}

export default Header
