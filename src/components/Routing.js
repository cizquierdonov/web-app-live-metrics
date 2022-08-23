import React, { useState, useEffect }  from 'react';
import {Routes, BrowserRouter, Route} from "react-router-dom";
import Timeline from './Timeline';
import PostDialog from './PostDialog';

const Routing = () => {
  
  const [posts, setPosts] = useState([]);
  const [types, setTypes] = React.useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [metric, setMetric] = React.useState("none");
  const metricTypesApiUrl = process.env.REACT_APP_METRIC_TYPES_API_URL;

  var options = {  
    method: 'GET',
    headers: {
      'Origin': 'http://localhost:3000/',
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    }
  };

  useEffect(() => {
    fetch(metricTypesApiUrl, options)
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setTypes(data);
        },
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      )
  }, []);

  //console.log("TYPES: ");
  //console.log(types);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return(
      <div className='text-center mt-5'>
        <div className="spinner-border loading-gif" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  } else {
    //console.log(types.metricTypes[0]);
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timeline posts={posts} setPosts={setPosts} types={types} setTypes={setTypes} metric={metric} setMetric={setMetric} />} />
          <Route path="/post" element={<PostDialog posts={posts} setPosts={setPosts} />} />
        </Routes>
      </BrowserRouter>
    );
  }
};

export default Routing;