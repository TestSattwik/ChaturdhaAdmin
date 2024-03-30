import React, { useEffect, useState } from 'react';
import { api } from "../Api/Api"

import { Helmet } from 'react-helmet-async';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TextField,Box
} from '@mui/material';
const YourComponent = () => {
  const [regions, setRegions] = useState([]);
  const [newRegionName, setNewRegionName] = useState('');
  const [newCityName, setNewCityName] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newStateNames, setNewStateNames] = useState('');

  const [loading, setLoading] = useState(true);
  
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [selectedStateId, setSelectedStateId] = useState(null);

  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedPincodeId, setSelectedPincodeId] = useState(null);

  // Create state to manage pincode inputs for each city separately
  const [pincodeInputs, setPincodeInputs] = useState({});
  const [cityNames, setCityNames] = useState({});
  const [stateNames, setStateNames] = useState({});


  // Create state to manage area inputs for each pincode separately
  const [areaInputs, setAreaInputs] = useState({});

  const fetchData = () => {
    api.get(`api/marketplace/nested_areas/`)
      .then(response => setRegions(response.data))
      .catch(error => console.error('Error fetching regions:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  
  const companyName = "Locations";

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

  
  const handleRegionSubmit = (e) => {
    e.preventDefault();

    console.log("jk", newRegionName)
    // Create a new region with the entered name
    const newRegion = { name: newRegionName };

    api.post(`api/marketplace/regions/`, newRegion)
      .then(response => {
        // Refetch the regions data after a new region is created
        api.get(`api/marketplace/nested_areas/`)
          .then(response => setRegions(response.data))
          .catch(error => console.error('Error fetching regions:', error));

        // Clear the input field
        setNewRegionName('');
      })
      .catch(error => console.error('Error creating region:', error));
  };

  
  const handleStateSubmit = (regionId) => (e) => {
    e.preventDefault();

    // Create a new city with the entered name and the selected region
    const newState = { name: stateNames[regionId], region: regionId };

    // Send a POST request to create the new state
    api.post(`api/marketplace/states/`, newState)
      .then(response => {
       
        // Clear the input field
        setStateNames({ ...stateNames, [regionId]: '' });
       fetchData()
      
      })
      .catch(error => console.error('Error creating state:', error));
  };

  

  const handleCitySubmit = (stateId) => (e) => {
    e.preventDefault();

    // Create a new city with the entered name and the selected region
    const newCity = { name: cityNames[stateId], state: stateId };

    // Send a POST request to create the new city
    api.post(`api/marketplace/cities/`, newCity)
      .then(response => {
        // Update the state with the new city
        setCityNames({ ...cityNames, [stateId]: '' });

       fetchData()
        // Clear the input field
      })
      .catch(error => console.error('Error creating city:', error));
  };

  const handlePincodeSubmit = (cityId) => (e) => {
    e.preventDefault();

    // Ensure pincodeInputs has a value for the specific city
    const cityPincode = pincodeInputs[cityId];

    if (!cityPincode.trim()) {
      // Optionally, you can handle this case by showing an error message or preventing the form submission.
      console.error('Pincode cannot be blank');
      return;
    }

    // Create a new pincode with the entered value and the selected city
    const newPincodeData = { code: cityPincode, city: cityId };
    // Send a POST request to create the new pincode
    api.post(`api/marketplace/pincodes/`, newPincodeData)
      .then(response => {
        // Update the state with the new pincode
        setPincodeInputs({ ...pincodeInputs, [cityId]: '' });
         fetchData()

      })
      .catch(error => console.error('Error creating pincode:', error));
  };

  const handleAreaSubmit = (pincodeId) => (e) => {
    e.preventDefault();


    const area = areaInputs[pincodeId];
    // Create a new area with the entered value and the selected pincode
    const newAreaData = { name: area, pincode: pincodeId };

    // Send a POST request to create the new area
    api.post(`api/marketplace/areas/`, newAreaData)
      .then(response => {
        // Update the state with the new area
        // Clear the input field for the specific pincode
        setAreaInputs({ ...areaInputs, [pincodeId]: '' });
        setNewArea('');
        fetchData()

      })
      .catch(error => console.error('Error creating area:', error));
  };



  // ...

  // Update the state for city name when typing in the input field

  const handleStateNameChange = (regionId, value) => {
    setStateNames({ ...stateNames, [regionId]: value });
  };


  const handleCityNameChange = (stateId, value) => {
    setCityNames({ ...cityNames, [stateId]: value });
  };


  // Update the state for pincodeInputs when typing in a pincode text field
  const handlePincodeInputChange = (cityId, value) => {
    setPincodeInputs({ ...pincodeInputs, [cityId]: value });
  };

  // Update the state for areaInputs when typing in an area text field
  const handleAreaInputChange = (pincodeId, value) => {
    setAreaInputs({ ...areaInputs, [pincodeId]: value });
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
    <>
      <Helmet>
        <title> Locations  </title>
      </Helmet>

      <Container>
        <div>
          <Stack direction={'row'} alignItems={'center'} spacing={1} pt={2}>
            <Typography variant="h1" component="div">Our Working Regions</Typography>
          </Stack>
              {/* Form for creating a new region */}
              <form onSubmit={handleRegionSubmit}>
           <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          p={1}
                        >
                    <TextField
                          type="text"
                          margin="dense"
                          label="Add New Region"
                          color='warning'
                          value={newRegionName}
                onChange={(e) => setNewRegionName(e.target.value)}
             ></TextField>
                       <Button type="submit" color='warning'>
                            Create Region
                          </Button>
                   </Stack>
            
          </form>
          <Card sx={{ width: '100%', padding: 1 }}>
          
          {regions?.map(region => (
            <div key={region.region_id}>
              <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                        >
                          <Typography variant="h2" component="div" pl={1} >Region : </Typography>
              <Typography variant="h2" component="div" color="orange">{region.region}</Typography>
               {/* Form for creating a new city within the region */}
               <form onSubmit={handleStateSubmit(region.region_id)}>
               <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          p={1}
                        >
                    <TextField
                          type="text"
                          margin="dense"
                          label="Add New State"
                          color='warning'
                          value={stateNames[region.region_id] || ''}
                    onChange={(e) => handleStateNameChange(region.region_id, e.target.value)}
                   ></TextField>
                       <Button type="submit" color='warning'>
                            Create state
                          </Button>
                   </Stack>
                
              </form>
              </Stack>
              {region?.states?.map(state => (
            <div key={state.state_id}>
              <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          paddingLeft={2}
                        >
                          <Typography variant="h3" component="div" pl={1} >State : </Typography>

              <Typography variant="h3" component="div" color="orange">{state.state}</Typography>
               {/* Form for creating a new city within the region */}
               <form onSubmit={handleCitySubmit(state.state_id)}>
               <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          p={1}
                        >
                    <TextField
                          type="text"
                          margin="dense"
                          label="Add New city"
                          color='warning'
                          value={cityNames[state.state_id] || ''}
                    onChange={(e) => handleCityNameChange(state.state_id, e.target.value)}
                   ></TextField>
                       <Button type="submit" color='warning'>
                            Create city
                          </Button>
                   </Stack>
                
              </form>
              </Stack>
              {state?.cities && state?.cities?.map(city => (
                <div key={city.city_id}>
                   <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          pl={3}
                        >
                          <Typography variant="h4" component="div" pl={1} >City : </Typography>
                  <Typography variant="h4" component="div" color="orange">{city.name}</Typography>
                    {/* Form for creating a new pincode within the city */}
                    <form onSubmit={handlePincodeSubmit(city.city_id)}>
                    <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          p={1}
                        >
                    <TextField
                          type="text"
                          margin="dense"
                          label="Add New Pincode"
                          color='warning'
                          value={pincodeInputs[city.city_id] || ''}
                          onChange={(e) => handlePincodeInputChange(city.city_id, e.target.value)}
                       ></TextField>
                       <Button type="submit" color='warning'>
                            Create Pincode
                          </Button>
                   </Stack>
                  </form>
                  </Stack>
                  <Card sx={{ width: '100%', margin: 3, padding: 1 }}>

{city?.pincodes && city?.pincodes?.map(pincode => (
  <div key={pincode.pincode_id}>
    <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        pl={2}
      >
    <Typography variant="h4" component="div" >Pincode : {pincode.code}</Typography>
      {/* Form for creating a new area within the pincode */}
      <form onSubmit={handleAreaSubmit(pincode.pincode_id)} style={{ justifyContent: "center", alignItems: "center" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
      >
      <TextField
        type="text"
        margin="dense"
        label="Add New Area Name"
        color='warning'
        value={areaInputs[pincode.pincode_id] || ''}
        onChange={(e) => handleAreaInputChange(pincode.pincode_id, e.target.value)}
      ></TextField>
        <Button type="submit" color='warning'>
          Create Area
        </Button>
   </Stack>

    </form>
    </Stack>
    <Stack
        // direction={"row"}
        // alignItems={"center"}
        spacing={1}
        pl={8}
      >
<Typography variant="h6" component="div" pl={2}>Area :</Typography>

    {pincode?.areas && pincode?.areas?.map(area => (
      <li key={area.area_id} style={{ paddingLeft: 20, marginLeft: 20 }}>{area}</li>
    ))}
    </Stack>

  
  </div>
))}
</Card>
                  </div>
              ))}

              
                </div>
              ))}

             
            </div>
          ))}

          </Card>
         
         
        </div>
      </Container>
    </>
  );
};


export default YourComponent;