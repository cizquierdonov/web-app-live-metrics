import ReactDOM from 'react-dom/client';
import * as React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/custom.css"
import Navbar from "./components/Navbar";
import Routing from "./components/Routing"
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <Navbar />
    <Routing />
    <Footer />
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
