import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React, { useState, useEffect }  from 'react';
import {WiDayFog} from 'weather-icons-react'

const VTimeline = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const metricPostsApiUrl = process.env.REACT_APP_METRIC_POSTS_API_URL;
  console.log("URL API: " + metricPostsApiUrl);

  var options = {  
    method: 'GET',
    headers: {
      'Origin': 'http://localhost:3000/',
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    }
  };

  useEffect(() => {
    fetch(metricPostsApiUrl, options)
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
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
      return <div>Loading...</div>;
  } else {
    console.log(posts);
    return(
      <div className='bg-grey'>
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
    );
  };
}

export default VTimeline;