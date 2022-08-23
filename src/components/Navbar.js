import React from "react";
import PostDialog from "./PostDialog";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container">
          <a className="navbar-brand">Live Metrics</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <div className="px-2" />
              <div>
                <a href="/" className="btn btn-dark btn-outline-light border-0">Timeline</a>
              </div>
              <div className="px-2" />
              <div>
                {/* <a href="/post" className="btn btn-primary btn-outline-light border-0">+ Post Metric</a> */}
                <PostDialog />
              </div>            
            </div>
          </div>
        </div>
      </nav>      
    </div>
  );
};

export default Navbar;