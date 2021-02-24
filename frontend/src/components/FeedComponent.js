import React from 'react'
import "./Feed.css"
import { useDispatch, useSelector } from "react-redux";
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ImageIcon from '@material-ui/icons/Image';

const FeedComponent = ({ user }) => {

    return (
        <div className="col-7 ">
            <div className=" bg-white rounded p-3">
                <div className="feed__inputContainer d-flex align-items-center">
                    <div>
                        <img className="rounded-circle mr-3" src={user.avatar} alt="" width="40" height="40" />
                    </div>
                    <div className="feed__input">
                        <input placeholder={`What's on your mind ${user.name}?`} type="text" />
                    </div>
                    {/* <div className="row p-3">
                    <div className="p-3">
                        <img className="rounded-circle mr-3" src={user.avatar} alt="" width="40" height="40" />
                        <input type="text" />
                    </div>
                </div> */}
                </div>
                <hr />
                <div className="d-flex">
                    {/* <div className="d-flex align-items-center">
                        <div class="input-group mb-3">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                                <label class="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                            </div>
                        </div>
                        <ImageIcon style={{ color: "#4550E6" }} />
                        <h6 className="mb-0" >Photo</h6>
                        <button className='btn  custom-btn-primary'>Post</button>
                    </div> */}
                    <input accept="image/*" className="d-none" id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file" className="mb-0">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <ImageIcon /><h5 className="mb-0 ml-2">Photo</h5>
                        </IconButton>
                    </label>
                    <button className='btn custom-btn-primary ml-auto' style={{ borderRadius: "50px", width: "150px" }}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default FeedComponent
