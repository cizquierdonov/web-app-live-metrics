import React from "react";
import {BsInstagram, BsGoogle, BsLinkedin, BsTelephoneFill, BsFillHouseDoorFill} from 'react-icons/bs';
import {BiMailSend} from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          {/* <a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a> */}
          <a href="mailto:izqunited@gmail.com" className="me-4 text-reset">
            <i className="fab fa-google"><BsGoogle /></i>
          </a>
          <a href="https://www.instagram.com/izqunited/" className="me-4 text-reset">
            <i className="bi bi-instagram"><BsInstagram /></i>
          </a>
          <a href="https://www.linkedin.com/in/carlos-izquierdo-s%C3%A1nchez-2096a019/" className="me-4 text-reset">
            <i className="fab fa-linkedin"><BsLinkedin /></i>
          </a>
          {/* <a href="" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a> */}
        </div>
      </section>
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            {/* <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit.
              </p>
            </div> */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Products
              </h6>
              <p>
                <a href="https://es.reactjs.org/" className="text-reset">React</a>
              </p>
              <p>
                <a href="https://quarkus.io/" className="text-reset">Quarkus</a>
              </p>
              <p>
                <a href="https://cloud.google.com/sql" className="text-reset">Google Cloud SQL</a>
              </p>
              <p>
                <a href="https://cloud.google.com/run" className="text-reset">Google Cloud Run</a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Useful links
              </h6>
              <p>
                <a href="https://gitlab.com/groups/cizquierdonov/live-metrics" className="text-reset">GitLab Project</a>
              </p>
              <p>
                <a href="https://app.diagrams.net/#G1HGe_iqgwu4FQwDNBW-1FL0MTv3BXDk3R" className="text-reset">Architecture Diagram</a>
              </p>
              {/* <p>
                <a href="#!" className="text-reset">Orders</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Help</a>
              </p> */}
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"><BsFillHouseDoorFill /></i> Santiago, Ñuñoa, Coventry 1049, CL</p>
              <p>
                <i className="fas fa-envelope me-3"><BiMailSend /></i>
                izqunited@gmail.com
              </p>
              <p><i className="fas fa-phone me-3"><BsTelephoneFill /></i> + 56 9 7567 4670</p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center p-4 footer-color" >
        © 2022 Copyright <b>Carlos Izquierdo</b>
      </div>
    </footer>
  );
};

export default Footer;