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
import { LinearProgress } from '@mui/material'; 
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
    const [loading, setLoading] = useState(true); // State to track loading status


    const retrieveFromLocalStorage = async () => {
      try {
        // Retrieve items from local storage
        const token = await localStorage.getItem('access_token');
        const role = await localStorage.getItem('employee_role_name');
        const id = await localStorage.getItem('employee_role_id');
        const city = await localStorage.getItem('employee_role_city');
        const cityId = await localStorage.getItem('employee_role_cityid');
        const region = await localStorage.getItem('employee_role_region');
        const regionId = await localStorage.getItem('employee_role_regionid');
        
        console.log('token:', token);
    
        console.log('Role:', role);
        console.log('ID:', id);
        console.log('City:', city);
        console.log('City ID:', cityId);
        console.log('Region:', region);
        console.log('Region ID:', regionId);
      } catch (error) {
        console.error('Error retrieving items from local storage:', error);
      }
    };
    
    useEffect(() => {
      retrieveFromLocalStorage();
    },[])
    
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
          setApiData(response?.data); // Use setApiData to update the state
      
        
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });
    }, []);
    


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Simulate loading delay for 2 seconds
  //       await new Promise(resolve => setTimeout(resolve, 2000));
  //       setLoading(false); // After loading, set loading state to false
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);



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
    
      apiData?.forEach((item) => {
        const region = item?.region;
        const regionName = item?.region_name; // Region name
        const stateId = item?.state_info?.id;
        const stateName = item?.state_info?.name; // State name
    
        item.city_info?.forEach((cityInfo) => {
          const cityId = cityInfo?.id;
          const cityName = cityInfo?.name; // City name
          const id = item?.id;
          const name = item?.name; // Assuming this is the user's name
    
          const regionKey = `${region}`; // Unique key for region and state combination
    
          if (!groupedData[regionKey]) {
            groupedData[regionKey] = { regionName, stateName, cities: {} };
          }
    
          if (!groupedData[regionKey].cities[cityId]) {
            groupedData[regionKey].cities[cityId] = { cityName, jobs: [] };
          }
    
          groupedData[regionKey].cities[cityId].jobs.push({ id, name });
        });
      });
    
      return groupedData;
    };
    
      const groupedData = groupDataByRegionCityName();

 
      const companyName = "Organisation";

      const [loadingCompany, setLoadingCompany] = useState("");
      
      useEffect(() => {
        if (loading) {
          animateCompany();
        }6000
      }, [loading]);
    
      const animateCompany = () => {
        let currentIndex = 0;
        
        const interval = setInterval(() => {
          if (currentIndex <= companyName.length) {
            setLoadingCompany(companyName.substring(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
            setLoading(false);
          }
        }, 100); // Adjust the interval duration as needed
      };
    
      if (loading) { 
        return (
          <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
       
        }}
      >
        <Typography variant="h6">{loadingCompany}</Typography>
      </Box>
    </Container>
        );
      }

     
      return (
        <Container maxWidth="xl">
       
          <div>
            {Object.keys(groupedData)?.map((regionStateKey) => (
              <div key={regionStateKey}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                  Region: {groupedData[regionStateKey].regionName}, State: {groupedData[regionStateKey].stateName}
                </Typography>
                {Object.keys(groupedData[regionStateKey].cities)?.map((cityId) => (
                  <div key={cityId}>
                    <Typography variant="h4" sx={{ mb: 5 }}>
                      City: {groupedData[regionStateKey].cities[cityId].cityName}
                    </Typography>
                    <Card xs={12}>
                <Grid container spacing={3} p={2}>
                        {groupedData[regionStateKey].cities[cityId]?.jobs?.map(({ id, name }, index) => (
                          <Grid item xs={12} sm={6} md={3} key={index}>
                              <AppWidgetSummary
                        title={name}
                        color="warning"
                        total={1}
                        icon="ant-design:team-outlined"
                      />
                           
                            <Link to={`/dashboard/SingleJob/${regionStateKey}/${cityId}/${id}`}>
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
      );
}
