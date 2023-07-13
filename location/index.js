const axios = require('axios');

const getCoordinatesFromAddress  =async  (address)  => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

    const response = await axios.get(apiUrl);
    if (response.data && response.data.length > 0) {
      const firstResult = response.data[0];
      const latitude = parseFloat(firstResult.lat);
      const longitude = parseFloat(firstResult.lon);
      return { latitude, longitude };
    } else {
      throw new Error(' Address not found');
    }
  } catch (error) {
    throw new Error('Error when retrieving coordinates');
  }
}

module.exports =getCoordinatesFromAddress;