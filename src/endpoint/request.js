import axios from 'axios';

class CarCategory {

  getSmallItems = async () => {
    try {
      const result = await axios.get(`small`);
      return result.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  getPremiumItems = async () => {
    try {
      const result = await axios.get(`premium`);
      return result.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  getVanItems = async () => {
    try {
      const result = await axios.get(`van`);
      return result.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  addReservationItem = async (category, name, brandname, email, phone) => {
    try {
      const result = await axios.post(`${category}`, {
        name, brandname, email, phone
      });
      return result.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  };

}

export default CarCategory;
