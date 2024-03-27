import axios from "axios"

const api = axios.create({
    baseURL: 'https://testsattwik.in/', // Replace with your backend API URL
    timeout: 5000, 
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers you need
    },
  });
 
export {api}