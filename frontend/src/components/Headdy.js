import React from 'react'
import "./headdy.css"
import SearchIcon from '@material-ui/icons/Search';

const Headdy = () => {
    return (
        <div className="headdy d-flex">
            <div className="header-left">
                <h2 className="mr-3">MeetDev</h2>

                <div className="header-search d-flex mt-3 align-items-center">
                    <SearchIcon />
                    <input type="text" />
                </div>
            </div>
        </div>
    )
}

export default Headdy
