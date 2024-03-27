import * as React from 'react';
import { useState,useEffect } from 'react';
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

export default function GeneralCity() {
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


    
    const [apiData, setApiData] = useState([]);

  // Fetch the API data on component mount
  useEffect(() => {
    const apiUrl = 'api/product/nested_areas/';

    api.get(apiUrl)
      .then((response) => {
        // Transform the response data to include IDs
        const transformedData = response.data.map(region => ({
          regionId: region.region_id, // Replace with your actual key for region ID
          region: region.region,
          cities: region.cities.map(city => ({
            cityId: city.city_id, // Replace with your actual key for city ID
            name: city.name,
          })),
        }));

        setApiData(transformedData);
        console.log(transformedData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);


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
            <Typography variant="h4" sx={{ mb: 5 }}>
        GI - General Information Survey of INDIA
      </Typography>
      {apiData.map((region) => (
        <Card xs={12} key={region.regionId}>
          <Typography variant="h4" sx={{ ml: 2, mt: 3 }}>
            {region.region} Region
          </Typography>
          {region.cities.map((city) => (
            <Grid container spacing={3} p={2} key={city.cityId}>
              <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title={city.name} color='warning' icon={'ant-design:team-outlined'} />
              
                <Button
                  color='warning'
                  component={Link}
                  to={`/dashboard/GeneralInfo/${region.regionId}/${city.cityId}`}
                >
                  Open
                </Button>
              </Grid>
            </Grid>
          ))}
        </Card>
      ))}
           
           
        </Container>

    )
}
