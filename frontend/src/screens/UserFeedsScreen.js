import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import FeedComponent from '../components/FeedComponent';
import FeedsSidebar from '../components/FeedsSidebar'
import { getUserDetails } from "../actions/userActions";

const UserFeedScreen = ({ history }) => {

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!userInfo) {
            history.push("/login");
        } else {
            dispatch(getUserDetails());
        }

    }, [userInfo, history]);
    return (
        <Container>
            <div className="row">
                <FeedsSidebar loading={loading} error={error} user={user} />
                <FeedComponent user={user} />
            </div>


        </Container>
    )
}

export default UserFeedScreen
