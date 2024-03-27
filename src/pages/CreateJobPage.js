import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {api} from "../Api/Api"
import {
    Card,
    Stack,
    Button,
    Checkbox,
    Container,
    Typography,
    Select, MenuItem,
    FormControl, InputLabel,
    ListItemText,
    CardContent,
    Grid
} from '@mui/material';
// import { Tree, TreeNode } from 'react-organizational-chart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateJobPage(props) {
    const [cityData, setCityData] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
   
    const [selectedUnder, setSelectedUnder] = useState([]);

    const [selectedCityId, setSelectedCityId] = useState([]);

    const [selectedRegionId, setSelectedRegionId] = useState([]);


    const [selectedCitiesId, setSelectedCitiesId] = useState([]);

    const [selectedUnderId, setSelectedUnderId] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);


    console.log(selectedCity)
    
    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');

    
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);

    const[experience,setExperience]=useState('');
    const [salary, setSalary] = useState('');
    const [workingUnder, setWorkingUnder] = useState([]);

    const [status, setStatus] = useState(false);
    const [jobRoles, setJobRoles] = useState([]);
    const [newParameter, setNewParameter] = useState('');
    

    const JOB_TYPE_CHOICES = [
        { value: 'full-time', label: 'Full-Time' },
        { value: 'part-time', label: 'Part-Time' },
        { value: 'wfh', label: 'WFH' },
      ];

     
  const handleJobTypeChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedJobTypes.includes(selectedValue)) {
      // Deselect the option
      setSelectedJobTypes(selectedJobTypes.filter((value) => value !== selectedValue));
    } else {
      // Select the option
      setSelectedJobTypes([...selectedJobTypes, selectedValue]);
    }
  };


  const handleCloseDialog = () => {
    // Close the dialog
    setOpenDialog(false);
  };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.checked);
    };

    const handleCityChange = (event) => {
        const selectedNames = event.target.value;
        setSelectedCity(selectedNames);
      
        // Log the corresponding IDs for selected names
        const selectedIds = cityData
          .filter((city) => selectedNames.includes(city.name))
          .map((city) => city.id);
      
        // Update the selectedCity state with the IDs
        const selectedId = selectedIds.length > 0 ? selectedIds[0] : 1;
        setSelectedCityId(selectedId);
        console.log(selectedId);
      };

      
      const handleUnderChange = (event) => {
        const selectedNames = event.target.value;
        setSelectedUnder(selectedNames);
       
      
        // Log the corresponding IDs for selected names
        const selectedIds = under
          .filter((unders) => selectedNames.includes(unders.name))
          .map((unders) => unders.id);
      
        
        setSelectedUnderId(selectedIds);
      
      };

    const handleWorkingUnderChange = (event) => {
        setUnder(event.target.value);
    };


    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);

    const [apiData, setApiData] = useState([]);

    // Fetch the API data on component mount
    useEffect(() => {
      
      const apiUrl = 'api/marketplace/nested_areas/';
  
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
  
  
    useEffect(() => {
      console.log("regionId", selectedRegion);
    }, [selectedRegion]);
    useEffect(() => {
      
    }, [selectedCityId]);
  
   
  const handleRegionChange = (event) => {
    const regionId = event.target.value;
    setSelectedRegion(regionId)
   
    

    // Find the selected region from the apiData
    const selectedRegionData = apiData.find((data) => data.regionId === regionId);

    // Set the available cities for the selected region
    setCities(selectedRegionData ? selectedRegionData.cities : []);
    setSelectedCities([]);
  };

  const handleCityChange1 = (event) => {
    const selectedNames = event.target.value;
  
    // Create a Set to ensure unique city IDs
    const selectedIdsSet = new Set();
  
    // Loop through the regions and city_info to find IDs based on selected names
    apiData.forEach((data) => {
      if (data.regionId === selectedRegion) {
        data.cities.forEach((city) => {
          if (selectedNames.includes(city.name)) {
            selectedIdsSet.add(city.cityId);
          }
        });
      }
    });
  
    // Convert the Set back to an array
    const selectedIds = Array.from(selectedIdsSet);
  
    setSelectedCities(selectedNames);
    setSelectedCityId(selectedIds); // Update selectedCityId
   
  };
  
  
    
    const[under,setUnder]=useState([])
    
    useEffect(() => {
        const apiUrl = 'api/employee/jobrole/';
    
        api.get(apiUrl)
          .then((response) => {
            // Handle the response data here
            setUnder(response.data);
            console.log(response.data)
          
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
          });
      }, []);


      console.log("cityNew",selectedCityId)

    const handleSave = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', jobTitle);
        formData.append('job_description', description);
        formData.append('experience', experience);
        formData.append('salary_package', salary);
        formData.append('working_under', selectedUnderId || null); 
        formData.append('job_type', selectedJobTypes); // Set your default job type as needed
        formData.append('city',  selectedCityId);
        formData.append('region',selectedRegion );

      
        try {
          const response = await api.post('api/employee/jobrole/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          // Handle the success response, e.g., show a success message or redirect
       
      
          // Clear or reset the form fields by updating the state variables
          setJobTitle('');
          setDescription('');
          setExperience('');
          setSalary(''); 
          setSelectedCity([]);
          setWorkingUnder([]);
          setSelectedJobTypes([]);
          setSelectedCityId([]);
          setSelectedUnder([])
          setSelectedRegionId([])
          
          setOpenDialog(true);
          
      
        } catch (error) {
          // Handle any errors that occurred during the POST request
          console.error('Error:', error);
        }
      };
      

    const [selectedSizes, setSelectedSizes] = useState([]);

   

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Create New Job Role For Arl-Tech
                </Typography>
            </Stack>

            <Stack direction="row" sx={{ width: '100%' }}>
                <Typography variant="h5" gutterBottom p={4} sx={{ width: '25%' }}>
                    Details :
                </Typography>

                <Card sx={{ width: '75%' }}>
                    <Stack spacing={3} p={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Select Region</InputLabel>
                            <Select
        label="Select Region"
        value={selectedRegion}
        onChange={handleRegionChange}
      >
        {apiData.map(data => (
          <MenuItem key={data.regionId} value={data.regionId}>
            {data.region}
          </MenuItem>
        ))}
      </Select>
      
      {selectedRegion && (
        <Select
          multiple
          label="Select Cities"
          value={selectedCities}
          onChange={handleCityChange1}
          renderValue={(selected) => selected.join(', ')}
        >
          {cities.map(city => (
            <MenuItem key={city.cityId} value={city.name}> {/* Use city.id as the value */}
              <Checkbox checked={selectedCities.includes(city.name)} />
              <ListItemText primary={city.name} />
            </MenuItem>
          ))}
        </Select>
      )}
                        </FormControl>
                        <TextField
                            label="Role Title"
                            fullWidth
                            //   value={productName}
                            // onChange={handleProductNameChange}
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />

                        <TextField
                            label="Add Job Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </Stack>
                </Card>
            </Stack>

            <Stack direction="row" sx={{ width: '100%' }} mt={4}>
                <Typography variant="h5" gutterBottom p={4} sx={{ width: '25%' }}>
                    Properties :
                </Typography>

                <Card sx={{ width: '75%' }}>
                    <Stack px={4} pt={4} direction="row">

                    {JOB_TYPE_CHOICES.map((jobType) => (
        <FormControlLabel
          key={jobType.value}
          control={
            <Checkbox
              checked={selectedJobTypes.includes(jobType.value)}
              onChange={handleJobTypeChange}
              value={jobType.value}
              color="primary"
            />
          }
          label={jobType.label}
        />
      ))}
                    </Stack>
                    <Stack px={4} direction="row">

                        <TextField
                            label="Experience"
                            fullWidth
                            //   value={productName}
                            // onChange={handleProductNameChange}
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        />
                    </Stack>
                    <Stack p={4} >
                        <TextField
                            label="Enter Salary"
                            variant="outlined"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            fullWidth
                            autoFocus
                        />
                    </Stack>
                    <Stack px={4} paddingBottom={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Working Under</InputLabel>
                            <Select
                                multiple
                                label="Working Under"
                                value={selectedUnder}
                                onChange={handleUnderChange}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                  {under.map((unders) => (
     
     selectedCityId === unders.id && (
        <MenuItem key={unders.id} value={unders.name}>
          <Checkbox checked={selectedUnder.includes(unders.name)} />
          <ListItemText primary={unders.name} />
        </MenuItem>
      )
      )
    )}
                            </Select>
                        </FormControl>
                    </Stack>

                </Card>
            </Stack>

            <Stack direction="row" sx={{ width: '100%' }} mt={4} justifyContent={'flex-end'}>
                <Button variant="contained" onClick={handleSave} color='warning'>
                    Create Job
                </Button>
            </Stack>


            {/* <Stack direction="row" sx={{ width: '100%' }} mt={4}>
                <Typography variant="h5" gutterBottom p={4} sx={{ width: '25%' }}>
                    Job Hierarchy :
                </Typography>
                <Card sx={{ width: '75%' }}>   
                    <Stack spacing={3} p={4} direction="row">
                    <Grid xs={6}>
                        {jobRoles.map((role, index) => (
                            <Card variant="outlined" >
                                <CardContent>
                                    <Typography variant="h6">{role.title}</Typography>
                                    <Typography variant="body1">
                                        City: {role.city.join(', ')}
                                    </Typography>
                                    <Typography variant="body1">
                                        Working under: {role.workingUnder.join(', ')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
                    </Stack>
                </Card>
            </Stack>

            <Stack direction="row" sx={{ width: '100%' }} mt={4}>
                <Typography variant="h5" gutterBottom p={4} sx={{ width: '25%' }}>
                    Example Job Hierarchy :
                </Typography>
                <Card sx={{ width: '75%' }}>   
                    <Stack spacing={3} p={4} direction="row">
                    
                    </Stack>
                </Card>
            </Stack> */}

        </Container>
    );
}
 