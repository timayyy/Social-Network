import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
    return (
        <>
            <section className="hero-section py-3 py-md-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 pt-3 mb-5 mb-lg-0">
                            <h1 className="site-headline font-weight-bold mb-3 text-dark">Find your community at <span className="hero-fancy-text">Meet Dev</span> </h1>
                            <div className="site-tagline mb-4">Like, comment and share your thoughts with other developers</div>
                            <div className="cta-btns mb-lg-3">
                                <Link className="btn custom-btn-primary mr-2 mb-3" to="/login">Get Started Free <i className="fas fa-arrow-circle-right ml-2"></i></Link>

                            </div>
                        </div>
                        <div className="col-12 col-lg-6 d-lg-block d-none  text-center">

                            {/* <img className="img-fluid" src="/img/undraw_Selecting_team_re_ndkbb.png" alt="..." /> */}
                            {/* <img className="img-fluid" src="/img/undraw_Business_decisions_re_84ag.png" alt="..." /> */}
                            <img className="img-fluid" src="/img/hero_img.png" alt="..." />
                        </div>
                    </div>
                    {/* <!--//row--> */}
                </div>
            </section>
        </>
    )
}

export default HeroSection
