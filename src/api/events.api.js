import axios from 'axios';

export const createEventRequest = async (newEvent) =>
  await axios.post('http://localhost:3000/api/v1/events', newEvent);
