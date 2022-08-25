import React, { useState, useEffect, setIsLoaded, setError }  from 'react';

import Box from '@mui/material/Box';
import MButton from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const PostDialog = ({posts, setPosts}) => {
  var tzoffset = (new Date()).getTimezoneOffset() * 60000;
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);  
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [metric, setMetric] = React.useState({type: "", error: false, color: "info"});
  const [metricValue, setMetricValue] = useState({value: "", error: false});
  const [review, setReview] = useState("");
  const [recordDate, setRecordDate] = useState({value: localISOTime, error: false});
  const [metricPostRes, setMetricPostRes] = useState({});
  
  const metricTypesApiUrl = process.env.REACT_APP_METRIC_TYPES_API_URL;
  const createMetricPostApiUrl = process.env.REACT_APP_METRIC_POSTS_API_URL;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    var fullDate = recordDate.value.replace('T', ' ') + ":00";

    if (!metric.error && !metricValue.error && !recordDate.error && metric.type && metricValue.value && recordDate.value) {
      
      var metricPostReq = {
        metricPost: {
          "type": metric.type,
          "value": metricValue.value,
          "review": review,
          "recordDate": fullDate
        }
      };

      var req = {  
        method: 'POST',
        body: JSON.stringify(metricPostReq),
        headers: {
          "Content-Type": "application/json"
        }
      };

      fetch(createMetricPostApiUrl, req)
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setMetricPostRes(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        console.log(metricPostRes);
        //posts = [];
        window.location.href = "/?type=" + metric.type;
      }
      setOpen(false);

    } else {
      console.log(metricTypeIsValid());
      //if (!metric.type || !metricTypeIsValid()) {
      //  setMetric({value: '', error: true, color: 'error'});
      //}
      if (!metricValue.value || !metricValue.value.match(/^[+-]?\d+(\.\d+)?$/)) {
        setMetricValue({error: true});
      }
      //var fullDate = recordDate.value + "Z";
      //if ( !recordDate.value || recordDate.value === '' || (new Date(fullDate) > new Date()) ) {
      //  setRecordDate({error: true});
      //}
    }
    
  };

  function metricTypeIsValid() {
    var arrTypes = types.metricTypes;
    for (const type of arrTypes) {
      console.log("type:'" + type.name + "', metricTypeValue:'" + metric.type + "'");
      if (metric.type === type.name) {
        console.log("valid metric type");
        return true;
      }
    }
    return false;
  }

  const handleMetricTypeChange = (event) => {
    if ( (event.target.value) && (event.target.value !== "none") ) {
      setMetric({type: event.target.value, error: false, color: "info"});
    } else {
      setMetric({type: event.target.value, error: true, color: "error"});
    }
    console.log("I changed metric type to: '" + metric.type + "'. Event: " + event.target.value);
  };

  const handleMetricValueChange = (event) => {
    if (event.target.value && event.target.value.match(/^[+-]?\d+(\.\d+)?$/)) {
      setMetricValue({value: event.target.value, error: false});
    } else {
      setMetricValue({value: event.target.value, error: true});
    }
  };

  const handleRecordDateChange = (event) => {
    var fullDate = event.target.value + "Z";
    if ( (fullDate) && (new Date(fullDate) <= new Date()) ) {
      setRecordDate({value: event.target.value, error: false});
    } else {
      setRecordDate({value: event.target.value, error: true});
    }
  };

  var options = {  
    method: 'GET'
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

    return (
      <React.Fragment>
        <button className="btn btn-primary btn-outline-light border-0" onClick={handleClickOpen}>
          + Post Metric
        </button>
        <Dialog
          fullWidth={fullWidth}
          //maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>New Metric Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Records a new measurement for a metric type
            </DialogContentText>
            <div className='mt-3'>
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
                  <InputLabel htmlFor="metric" color={metric.color}>Metric Type *</InputLabel>
                  <Select
                    autoFocus
                    required
                    value={metric.type}
                    onChange={handleMetricTypeChange}
                    label="Metric Type"
                    variant='outlined'
                    inputProps={{
                      name: 'metric',
                      id: 'metric',
                    }}
                    error={metric.error}
                  >
                    <MenuItem key="" value="none" >-- Select metric type --</MenuItem>
                    {types.metricTypes.map(type => (
                      <MenuItem key={type.name} value={type.name}>{type.name}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                  <div className='mt-3'>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="value"
                      label="Value"
                      type="text"
                      fullWidth
                      variant="standard"
                      placeholder="10.0"
                      helperText="Integer or float with '.' separator (Required)"
                      inputProps={{ maxLength: 8 }}
                      onChange={handleMetricValueChange}
                      error={metricValue.error}
                    />
                  </div>
                  <div className='mt-3'>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="review"
                      label="Review"
                      type="text"
                      fullWidth
                      variant="standard"                      
                      placeholder="Taken this morning at 7 am"
                      helperText="Description about the record (Optional)"
                      onChange={(e) => setReview(e.target.value)}
                      inputProps={{ maxLength: 100 }}
                    />
                  </div>
                  <div className='mt-5'>                    
                    <TextField
                      required
                      id="datetime-local"
                      label="Record Date"
                      type="datetime-local"
                      value={recordDate.value}
                      helperText="Less than or equal to the current time (Required)"
                      sx={{ width: 250 }}
                      onChange={handleRecordDateChange}
                      InputLabelProps={{
                        shrink: true,
                        max: (new Date()).toISOString().slice(0, 16)
                      }}
                      error={recordDate.error}
                    />
                  </div>
                </FormControl>
              </Box>
            </div>
          </DialogContent>
          <DialogActions>
            <MButton onClick={handleClose}>Close</MButton>
            <MButton onClick={handleSave}>Save</MButton>
          </DialogActions>

        </Dialog>
      </React.Fragment>
    );
  }
}

export default PostDialog;