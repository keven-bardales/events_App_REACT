import axios from 'axios';

export const createEventRequest = async (newEvent) =>
  await axios.post('http://localhost:3000/api/v1/events', newEvent);

export const getEventRequest = async () =>
  await axios.get('http://localhost:3000/api/v1/events');

export const deleteEventRequest = async (id) =>
  await axios.delete(`http://localhost:3000/api/v1/events/${id}`);

export const updateEventRequest = async (id, updatedEvent) =>
  await axios.put(`http://localhost:3000/api/v1/events/${id}`, updatedEvent);

export const getEventByIdRequest = async (id) =>
  await axios.get(`http://localhost:3000/api/v1/events/${id}`);

export const getLocations = async () =>
  await axios.get('http://localhost:3000/api/v1/locations');

export const getLocationsRequest = async () =>
  await axios.get(`http://localhost:3000/api/v1/locations`);

export const createLocationRequest = async (newLocation) =>
  await axios.post(`http://localhost:3000/api/v1/locations`, newLocation);

export const getLocationByIdRequest = async (id) =>
  await axios.get(`http://localhost:3000/api/v1/locations/${id}`);

export const updateLocationRequest = async (id, newLocation) =>
  await axios.put(`http://localhost:3000/api/v1/locations/${id}`, newLocation);

export const deleteLocationRequest = async (id) =>
  await axios.delete(`http://localhost:3000/api/v1/locations/${id}`);

export const getCategoriesRequest = async () =>
  await axios.get(`http://localhost:3000/api/v1/categories`);

export const getOrganizersRequest = async () =>
  await axios.get(`http://localhost:3000/api/v1/organizers`);

export const getOrganizerByIdRequest = async (id) =>
  await axios.get(`http://localhost:3000/api/v1/organizers/${id}`);

export const updateOrganizerRequest = async (id, newOrganizer) =>
  await axios.put(
    `http://localhost:3000/api/v1/organizers/${id}`,
    newOrganizer
  );

export const createOrganizerRequest = async (organizer) =>
  await axios.post(`http://localhost:3000/api/v1/organizers`, organizer);

export const getUsersRequest = async () =>
  await axios.get(`http://localhost:3000/api/v1/users`);

export const createUserRequest = async (user) =>
  await axios.post(`http://localhost:3000/api/v1/users`, user);

export const deleteUserRequest = async (id) =>
  await axios.delete(`http://localhost:3000/api/v1/users/${id}`);

export const getUserByIdRequest = async (id) =>
  await axios.get(`http://localhost:3000/api/v1/users/${id}`);

export const updateUserRequest = async (id, newUser) =>
  await axios.put(`http://localhost:3000/api/v1/users/${id}`, newUser);
