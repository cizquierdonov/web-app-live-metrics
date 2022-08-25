import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React, { useState, useEffect }  from 'react';
import {WiDayFog} from 'weather-icons-react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle} from 'mdb-react-ui-kit';
import TextField from '@mui/material/TextField';

const Timeline = ({posts, setPosts, types, setTypes, metric, setMetric}) => {

  var tzoffset = (new Date()).getTimezoneOffset() * 60000;
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gifLoading, setGifLoading] = useState(false);
  const [avgDate, setAvgDate] = useState(localISOTime);
  const [averageRes, setAverageRes] = useState({
    average: {
      metricType: "",
      date: "",
      avgPerDay: "",
      avgPerHour: "",
      avgPerMinute: ""
    }
  });
  
  const metricsDalApiHost = process.env.REACT_APP_MS_LIVEMET_METRICS_DAL_HOST
  const metricPostsApiContextPath = process.env.REACT_APP_METRIC_POSTS_API_CONTEXT_PATH;

  const handleMetricTypeChange = (event) => {
    setIsLoaded(false);
    setGifLoading(true);    
    setMetric(event.target.value);
    setAverageRes({
      average: {
        metricType: "",
        date: "",
        avgPerDay: "",
        avgPerHour: "",
        avgPerMinute: ""
      }
    });
    callGetPostsApi(event.target.value);

    if (isLoaded) {
      setGifLoading(false);
    }
  };

  const callGetPostsApi = (metricType) => {
    var fullUrl = metricsDalApiHost + metricPostsApiContextPath + "?type=" + metricType;

    var options = {  
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
      }
    };

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

  const callGetAverageApi = (metricType, date) => {
    var fullUrl = metricsDalApiHost + metricPostsApiContextPath + "/average";
    console.log("date: " + date);

    var getAvgReq = {
      average: {
        "metricType": metricType,
        "date": date
      }
    };

    var options = {  
      method: 'POST',
      body: JSON.stringify(getAvgReq),
      headers: {
        'Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        "Content-Type": "application/json"
      }
    };

    fetch(fullUrl, options)
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setAverageRes(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      ) 
  }

  const handleClickGetAverage = () => {
    setIsLoaded(false);
    var fullDate = avgDate.replace('T', ' ') + ":00";
    callGetAverageApi(metric, fullDate);

    if (isLoaded) {
      console.log("AVERAGE:")
      console.log(averageRes);
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
      <div className='mt-2'>
        <div className='text-center px-3'>
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
            <div className='box01'>
              <div className='box02'>
                <TextField
                  id="metric"
                  select
                  value={metric}
                  onChange={handleMetricTypeChange}
                  label="Metric"
                  size="small"
                  sx={{ width: 230 }}
                >
                  <MenuItem key="none" value="none" >-- Select metric type --</MenuItem>
                  {types.metricTypes.map(type => (
                    <MenuItem key={type.name} value={type.name}>{type.name}</MenuItem>
                  ))}
                </TextField>
              </div>
              <div className='box04' />
              <div className='box02'>
                <TextField
                  id="datetime-local"
                  label="Average Date"
                  type="datetime-local"
                  disabled={!(posts && posts.metricPosts && posts.metricPosts.length > 0)}
                  value={avgDate}
                  size="small"
                  sx={{ width: 230 }}
                  onChange={(e) => setAvgDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className='box04' />
              <div className='box03'>
                <button
                  className="btn btn-primary btn-outline-dark border-0"
                  onClick={handleClickGetAverage}
                  disabled={!(posts && posts.metricPosts && posts.metricPosts.length > 0)}
                >
                  Get Average
                </button>
              </div>
            </div>    
            </FormControl>
          </Box>
        </div>           

        <div className='bg-grey' style={{visibility: (posts && posts.metricPosts && posts.metricPosts.length > 0) ? 'visible' : 'hidden'}}>

          <div className='text-center'>

          </div>

          <div style={{visibility: (averageRes && averageRes.average && averageRes.average.metricType !== '' && metric !== '' && metric !== 'none') ? 'visible' : 'hidden'}}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)" gap={6}
              sx={{
                flexDirection: 'column',
                m: 'auto',
                width: 'fit-content',
              }}
            >
              <Box gridColumn="span 4" className='mt-3'>              
                <MDBCard shadow='0' background='white' className='mb-3 text-center' style={{ maxWidth: '18rem' }} alignment="center">
                  <MDBCardHeader background='primary' className='text-white'>Average per Minute</MDBCardHeader>
                  <MDBCardBody className='text-dark'>
                    <MDBCardTitle>{averageRes.average.avgPerMinute}</MDBCardTitle>                
                  </MDBCardBody>
                </MDBCard>
              </Box>
              <Box gridColumn="span 4" className='mt-3'>
                <MDBCard shadow='0' background='white' className='mb-3 text-center' style={{ maxWidth: '18rem' }} alignment="center">
                  <MDBCardHeader background='primary' className='text-white'>Average per Hour</MDBCardHeader>
                  <MDBCardBody className='text-dark'>
                    <MDBCardTitle>{averageRes.average.avgPerHour}</MDBCardTitle>                
                  </MDBCardBody>
                </MDBCard>
              </Box>
              <Box gridColumn="span 4" className='mt-3'>
                <MDBCard shadow='0' background='white' className='mb-3 text-center' style={{ maxWidth: '18rem' }} alignment="center">
                  <MDBCardHeader background='primary' className='text-white'>Average per Day</MDBCardHeader>
                  <MDBCardBody className='text-dark'>
                    <MDBCardTitle>{averageRes.average.avgPerDay}</MDBCardTitle>                
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