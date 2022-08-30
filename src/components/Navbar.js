import React from "react";
import PostDialog from "./PostDialog";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom navbar-expand">
        <div className="container">
          <a href="/" className="navbar-brand">Live Metrics</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {/* <div className="px-1" />
              <div>
                <a href="/" className="btn btn-dark btn-outline-light border-0">Timeline</a>
              </div> */}
              <div className="px-3" />
              <div>
                <a href="#" className="btn btn-primary btn-outline-light border-0" onClick={handleClickOpen}>+ Post Metric</a>
                { <PostDialog open={open} setOpen={setOpen} /> }
              </div>            
            </div>
          </div>
        </div>
      </nav>      
    </div>
  );
};

export default Navbar;