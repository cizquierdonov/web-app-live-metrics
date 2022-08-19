import React from 'react';
import {Routes, BrowserRouter, Route} from "react-router-dom";
/*import MetricTimeline from './Timeline';*/
import VTimeline from './VTimeline';
import PostDialog from './PostDialog';

const Routing = () => {
    return(
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MetricTimeline />} /> */}
          <Route path="/" element={<VTimeline />} />
          <Route path="/post" element={<PostDialog />} />
        </Routes>
      </BrowserRouter>
    );
};

export default Routing;