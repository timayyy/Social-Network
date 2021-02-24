import { Avatar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton';

import "./sidebar.css"

const FeedsSidebar = ({ loading, error, user }) => {

    return (
        <div className="sidebar col-4 bg-white">
            <div className="sidebar__top">
                <div className="text-center py-3">
                    {loading ? <Skeleton variant="rect" width={340} height={257} /> :
                        <img src={user.avatar} className="img-fluid sidebar" alt="" />
                    }

                    {/* <Avatar /> */}
                </div>

                <div className="text-center py-3">
                    {loading ? <Skeleton variant="text" /> : <span className="font-weight-bold">{user.name}</span>}
                    <br />
                    {loading ? <Skeleton variant="text" /> : <span>{user.email}</span>}
                </div>

            </div>
            <div className="row">
                <div className="col-6 border">
                    <div className="text-center py-3">
                        {loading
                            ?
                            <Skeleton variant="text" />
                            :
                            <span className="font-weight-bold">{user.followers && user.followers.length}</span>}

                        <br />
                        {loading ? <Skeleton variant="text" /> : <span>Followers</span>}
                    </div>
                </div>
                <div className="col-6 border">
                    <div className="text-center py-3">
                        {loading ? <Skeleton variant="text" /> : <span className="font-weight-bold">{user.following && user.following.length}</span>}

                        <br />
                        {loading ? <Skeleton variant="text" /> : <span>Following</span>}

                    </div>
                </div>
            </div>
            <div className="text-center py-3">
                <Link to="/me">View my profile</Link>
            </div>
        </div>
    )
}

export default FeedsSidebar
