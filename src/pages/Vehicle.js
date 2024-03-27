import React, { useState } from 'react';
import {api} from '../Api/Api'; // Import the axios library
import { Card, Stack, Button, Container, Typography,TextField} from '@mui/material';
import { useDropzone } from 'react-dropzone';

export default function Vehicle(props) {
  const [vehicleName, setVehicleName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', vehicleName);
    formData.append('image', imageFile); // Add the image file to the formData

    try {
      const response = await api.post('api/product/vehicles/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the success response, e.g., show a success message or redirect
      console.log('Request successful:', response.data);

      // Clear or reset the form fields by updating the state variables
      setVehicleName('');
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      // Handle any errors that occurred during the POST request
      console.error('Error:', error);
    }
  };

  function Basic(props) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: (acceptedFiles) => {
        setImageFile(acceptedFiles[0]);

        // Create a URL for the image preview
        const imageURL = URL.createObjectURL(acceptedFiles[0]);
        setImagePreview(imageURL);
      },
    });

    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    const dropzoneStyle = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
    };

    const dropzoneClassName = 'dropzone';

    return (
      <section className="container">
        <div {...getRootProps({ style: dropzoneStyle, className: dropzoneClassName })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Uploaded Images :</h4>
          <ul>{files}</ul>
        </aside>
        {imagePreview && (
          <div>
            <h4>Image Preview:</h4>
            <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%' }} />
          </div>
        )}
      </section>
    );
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Create New Vehicle For Arl-Tech
        </Typography>
      </Stack>

      <Card>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={3} p={4}>
            <TextField
              label="Enter Vehicle Name"
              fullWidth
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
            />
            <Stack mt={4}>
              <h4>Upload Image</h4>
              <Basic />
            </Stack>
            <Button type="submit" variant="contained" color="warning">
              Submit
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}