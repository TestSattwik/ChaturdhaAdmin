import * as React from 'react';
import { useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { Helmet } from 'react-helmet-async';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, Grid, Container, Typography, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Iconify from '../components/iconify';
import {
    AppTasks,
    AppNewsUpdate,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppWidgetSummary,
    AppCurrentSubject,
    AppConversionRates,
} from '../sections/@dashboard/app';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';
import {api} from "../Api/Api"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useParams } from 'react-router-dom';


export default function GeneralInfo() {
    const [open, setOpen] = useState(false);
    const { regionId,cityId } = useParams();
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [apiData, setApiData] = useState([]);
    const [selectedRole, setSelectedRole] = useState(''); // Store jobrole_name
    const [selectedUid, setSelectedUid] = useState(''); // Store uid of the selected role
    const [questionText, setQuestionText] = useState('');
    
    // Extract and filter the role (jobrole_name) data from apiData
    const roleOptions = apiData.map((employee) => employee.name);
    
    // Function to handle the POST request
    const handlePostRequest = () => {
      // Create a data object with the selected role (jobrole_name), uid, and text value
      const currentTime = new Date(); // Get the current time
      const date = moment(selectedDate).format('YYYY-MM-DD');

      const formattedTime = currentTime.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });


      const postData = {
        assign_to_role: selectedUid, // Include uid
        question_text: questionText,
        current_time: formattedTime,
        deadline: date,
        question_type:'General'

      };
    
      // Perform your POST request here using axios or fetch
      // Example with axios:
      api.post('api/servey/questions/create/', postData)
        .then((response) => {
          // Handle the response as needed
          console.log('POST request successful', response);
          handleClose()
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });
    };

    const [question,setQuestionData] =useState([]);

    useEffect(() => {
        // Define a function to fetch employees
        const fetchEmployees = async () => {
          try {
            // Make a GET request to your Django API with query parameters
            const response = await api.get('api/employee/jobrole/by_region_city/', {
              params: { region:regionId, city:cityId},
            });
             console.log("response",response)
            setApiData(response.data);           
          } catch (error) {
            console.error('Error fetching employees:', error);
          }
        };
    
        // Call the fetchEmployees function to initially load employees
        fetchEmployees();
      }, [regionId, cityId,]); // Re-fetch when city or role changes

    useEffect(() => {

        const formdata={
            region:regionId,
            city :cityId,
            question_type:'General'
        }
        console.log("cbjdcj",formdata)
     
    
      api.get('api/servey/questionsregioncity/',{ params: formdata })
        .then((response) => {
          // Handle the response data here
          setQuestionData(response.data); // Use setApiData to update the state
          console.log("bhn",response.data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });
    }, []);

    const [answer,setAnswerData] =useState([]);

    useEffect(() => {
        // Fetch answers for each question
        const fetchAnswers = async () => {
          const answerData = [];
    
          for (const questionItem of question) { // Renamed the variable to questionItem
            try {
              const response = await api.get(`api/servey/answers/${questionItem.id}/`);
              answerData.push(response.data);
            } catch (error) {
              console.error('Error:', error);
            }
          }
    
          setAnswerData(answerData);
        };
    
        if (question.length > 0) {
          fetchAnswers();
        }
      }, [question]);
    
    
    
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange= (date) => {
        setSelectedDate(date);
      };


      const formatIndianTime = (dateTimeString) => {
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
         
        };
      
        // Convert the given date string to a Date object
        const date = new Date(dateTimeString);
      
        // Format the date using the Indian time zone (en-IN)
        const formattedDate = date.toLocaleString('en-IN', options);
      
        return formattedDate;
      };
    
    return (

        <Container maxWidth="xl">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                   GI - General Information of Bhubaneswar
                </Typography>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} color='warning' onClick={handleOpen}>
                    Add New Question
                </Button>
            </Stack>
            <Box sx={{ width: '100%' }}>
            {question.map((question, index) => ( <Grid spacing={3} mt={5}  key={question.id}>
                        <Card xs={12}>
                            <CardContent>
                            <Typography variant="h4" sx={{ my: 5 }}>
                {index + 1}. {question.question_text}
              </Typography>
              {answer[index] && answer[index].map((answer) => (
                <Typography variant="body1" sx={{ mb: 2 }} key={answer.id}>
                  Answer: {answer.answer_text}, time - {answer.current_time && formatIndianTime(answer.current_time)}
                </Typography>
              ))}

<Typography variant="body2" color="text.secondary">
                Date:{question.deadline && formatIndianTime(question.deadline)}, Report By - {question.assign_to_name} 
              </Typography>
                                <Button
                                    component="a"
                                    href={'https://example.com/report.pdf'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="small"
                                    color='warning'
                                    sx={{ mt: 2 }}
                                >
                                    View PDF
                                </Button>

                            </CardContent>
                        </Card>
                    </Grid>))}
                
               
            </Box>

            <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Add New Question</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please enter your question for the survey
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        label="Question"
        type="text"
        fullWidth
        color='warning'
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <Autocomplete
        options={roleOptions}
        value={selectedRole}
        onChange={(_, newValue) => {
          const selectedEmployee = apiData.find(employee => employee.name === newValue);
          setSelectedRole(newValue);
          setSelectedUid(selectedEmployee ? selectedEmployee.id : ''); // Set the id
        }}
        renderInput={(params) => <TextField color='warning' {...params} label="Select Role" />}
      />
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color='warning'>Cancel</Button>
      <Button onClick={handlePostRequest} color='warning'>Send</Button>
    </DialogActions>
  </Dialog>




        </Container>

    )
}
