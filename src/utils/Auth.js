import axiosClient from "../config/axiosClient";

async function checkTokenValidity(accessToken) {
    try {
      
      const res = await axiosClient.post('/auth/verify-token', {
        token: accessToken,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
  
      // Assuming the API responds with JSON data indicating token validity
      const data =  res.data;
  
      return data.isValid; // Return true if the token is valid, false otherwise
    } catch (error) {
    //   console.error('Failed to verify token validity:', error);
      return false; // Return false on error or token invalidity
    }
  }
  
  async function refreshAccessToken(refreshToken) {
    try {
     

      const res = await axiosClient.post('/auth/reauth', {   
      }, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}`,
          },
          withCredentials: true,
      })
      // Assuming the API responds with JSON data containing a new access token
      
      const data = await res.data;
  
      return data.accessToken; // Return the new access token
    } catch (error) {
      // console.error('Failed to refresh access token:', error);
      return null; // Return null on error or failed token refresh
    }
  }
  export {
    checkTokenValidity,
    refreshAccessToken
  }