import  React,{useEffect} from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { Helmet } from 'react-helmet-async';
import Card from '@mui/material/Card';
import {api} from "../Api/Api"

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, Grid, Container, Typography, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
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

const buttons = [
    <Button key="one">CV</Button>,
    <Button key="digital">Digital Signature</Button>,
    <Button key="10th">10th certificate</Button>,
    <Button key="12th">12th certificate</Button>,
    <Button key="graduation">Graduation certificate</Button>,
    <Button key="PAN">PAN Card</Button>,
    <Button key="Adhar">Adhar Card</Button>,
];

export default function JobPage() {
    const [open, setOpen] = useState(false);
    const [JobRoleValue, setJobRoleValue] = useState('');
    const [pincodeValue, setPincodeValue] = useState('');
    const [multiSelectAreas, setMultiSelectAreas] = useState([]);
    const [multiSelectVehicles, setMultiSelectVehicles] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [tasks, setTasks] = useState([]);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleJobRoleChange = (event) => {
        setJobRoleValue(event.target.value);
    };
    const handlePincodeChange = (event) => {
        setPincodeValue(event.target.value);
    };

    const handleAreaChange = (event, values) => {
        setMultiSelectAreas(values);
    };
    const handleVehicleChange = (event, values) => {
        setMultiSelectVehicles(values);
    };
    const handleFormSubmit = () => {
        // Perform your form submission logic here
        // console.log('Submitted:', inputValue, dropdownValue);
         // Assuming the offer and joining dates are stored in variables
         const offerDate = '11th November 2023';
         const joiningDate = '11th November 2023';
 
         // Show the success message
         setSuccessMessage(`You have successfully sent the offer letter and Joining letter to the candidate on ${joiningDate}.`);
 
        handleClose();
    };


    const [apiData, setApiData] = useState([]);

    useEffect(() => {
      const apiUrl = 'api/employee/jobrole/';
    
      api.get(apiUrl)
        .then((response) => {
          // Handle the response data here
          setApiData(response.data); // Use setApiData to update the state
          console.log(response.data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });
    }, []);
    



    const handleViewFormatClick = () => {
        // Assuming pdfUrl is the URL of the PDF you want to download
        const pdfUrl = 'https://www.africau.edu/images/default/sample.pdf';
        
        // Create a hidden link element
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'offer_letter.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const groupDataByRegionCityName = () => {
      const groupedData = {};
  
      apiData.forEach((item) => {
        const region = item.region;
        const regionName = item.region_name; // Region name
        item.city_info.forEach((cityInfo) => {
          const cityId = cityInfo.id;
          const cityName = cityInfo.name; // City name
          const id = item.id;
          const name = item.name; // Assuming this is the user's name
  
          if (!groupedData[region]) {
            groupedData[region] = { regionName, cities: {} };
          }
  
          if (!groupedData[region].cities[cityId]) {
            groupedData[region].cities[cityId] = { cityName, jobs: [] };
          }
  
          groupedData[region].cities[cityId].jobs.push({ id, name });
        });
      });
  
      return groupedData;
    };
  
    const groupedData = groupDataByRegionCityName();
      
      
    return (

        <Container maxWidth="xl">
            {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Total Arl-Tech Employees - 32
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} color='warning' component={Link} to="/dashboard/createjob">
            Edit Job Profile
          </Button>
        </Stack> */}
            <div>
      {Object.keys(groupedData).map((region) => (
        <div key={region}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Region: {groupedData[region].regionName}
          </Typography>
          {Object.keys(groupedData[region].cities).map((cityId) => (
            <div key={cityId}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                City: {groupedData[region].cities[cityId].cityName}
              </Typography>
              <Card xs={12}>
                <Grid container spacing={3} p={2}>
                  {groupedData[region].cities[cityId].jobs.map(({ id, name }, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <AppWidgetSummary
                        title={name}
                        color="warning"
                        total={1}
                        icon="ant-design:team-outlined"
                      />
                      <Link to={`/dashboard/SingleJob/${region}/${cityId}/${id}`}>
                        <Button color="warning">Open</Button>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </div>
          ))}
        </div>
      ))}
    </div>
        </Container>

    )
}
