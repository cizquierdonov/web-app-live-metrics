import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React, { useState, useEffect }  from 'react';
import {WiDayFog} from 'weather-icons-react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardText
} from 'mdb-react-ui-kit';

const Timeline = ({posts, setPosts, types, setTypes, metric, setMetric}) => {

  //const [metric, setMetric] = React.useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gifLoading, setGifLoading] = useState(false);
  
  const metricPostsApiUrl = process.env.REACT_APP_METRIC_POSTS_API_URL;

  var options = {  
    method: 'GET',
    headers: {
      'Origin': 'http://localhost:3000/',
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    }
  };

  const handleMetricTypeChange = (event) => {
    setIsLoaded(false);
    setGifLoading(true);    
    setMetric(event.target.value);
    callGetPostsApi(event.target.value);

    if (isLoaded) {
      setGifLoading(false);
    }
  };

  const callGetPostsApi = (metricType) => {
    var fullUrl = metricPostsApiUrl + "?type=" + metricType;

    if (metric && metric !== '') {
      fetch(fullUrl, options)
        .then(res => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setPosts(data);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )      
    }
  }

  useEffect(() => {
    callGetPostsApi(metric);
  }, []);

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
    return(

      <div>
        <div className='text-left px-3'>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="metric" color="info" >Metric *</InputLabel>
              <Select
                autoFocus
                required
                value={metric}
                onChange={handleMetricTypeChange}
                label="Metric"
                variant='outlined'
                inputProps={{
                  name: 'metric',
                  id: 'metric',
                }}
              >
                <MenuItem key="none" value="none" >-- Select metric type --</MenuItem>
                {types.metricTypes.map(type => (
                  <MenuItem key={type.name} value={type.name}>{type.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>

          <div className='mt-3' />
        </div>
            

        <div className='bg-grey' style={{visibility: (posts && posts.metricPosts && posts.metricPosts.length > 0) ? 'visible' : 'hidden'}}>

          <div className='text-center' style={{visibility: (gifLoading) ? 'visible' : 'hidden'}}>
            <div className="spinner-border loading-gif" role="status">
              <span className="sr-only"></span>
            </div>
          </div>

          <div>
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)" gap={2}
              sx={{
                flexDirection: 'column',
                m: 'auto',
                width: 'fit-content',
              }}
            >
              <Box gridColumn="span 4">
              
              <MDBCard shadow='0' background='white' className='mb-3 text-center' style={{ maxWidth: '18rem' }} alignment="center">
                <MDBCardHeader background='primary' className='text-white'>Average per Minute</MDBCardHeader>
                <MDBCardBody className='text-dark'>
                  <MDBCardTitle>23.5 °C</MDBCardTitle>                
                </MDBCardBody>
              </MDBCard>
              </Box>
              <Box gridColumn="span 4">
              <MDBCard shadow='0' background='white' className='mb-3 text-center' style={{ maxWidth: '18rem' }} alignment="center">
                <MDBCardHeader background='primary' className='text-white'>Average per Hour</MDBCardHeader>
                <MDBCardBody className='text-dark'>
                  <MDBCardTitle>66 °C</MDBCardTitle>                
                </MDBCardBody>
              </MDBCard>
              </Box>
              <Box gridColumn="span 4">
              <MDBCard shadow='0' background='white' className='mb-3 text-center' style={{ maxWidth: '18rem' }} alignment="center">
                <MDBCardHeader background='primary' className='text-white'>Average per Day</MDBCardHeader>
                <MDBCardBody className='text-dark'>
                  <MDBCardTitle>-79.1 °C</MDBCardTitle>                
                </MDBCardBody>
              </MDBCard>
              </Box>
            </Box>
          </div>

          <VerticalTimeline lineColor='white'>
            {posts.metricPosts.map(post => (                  
              <VerticalTimelineElement
                key={post.id}
                className="vertical-timeline-element--work"
                contentStyle={{ borderTopColor: '#2196f3' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date={post.recordDate}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<WiDayFog />}
              >
                <h3 className="vertical-timeline-element-title">{post.value}</h3>
                <p>
                {post.review}
                </p>
              </VerticalTimelineElement>  
            ))}          
          </VerticalTimeline>
        </div>
      </div>

    );
  };
}

export default Timeline;