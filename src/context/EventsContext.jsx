import { createContext, useState, useEffect, useContext } from 'react';
import {
  getEventRequest,
  deleteEventRequest,
  createEventRequest,
  createUserRequest,
  getUsersRequest,
  getEventByIdRequest,
  getOrganizerByIdRequest,
  getLocationsRequest,
  getCategoriesRequest,
  getOrganizersRequest,
  updateEventRequest,
  updateOrganizerRequest,
  updateUserRequest,
  createLocationRequest,
  createOrganizerRequest,
  getLocationByIdRequest,
  getUserByIdRequest,
  updateLocationRequest,
  deleteLocationRequest,
  deleteUserRequest,
  deleteOrganizerRequest,
} from '../api/events.api.js';
import User from '../components/usersComponents/User.jsx';

export const EventsContext = createContext();

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within a EventsContextProvider');
  } else {
    return context;
  }
};

export function EventsContextProvider(props) {
  const [events, setevents] = useState([]);
  const [locations, setlocations] = useState([]);
  const [categories, setcategories] = useState([]);
  const [organizers, setorganizers] = useState([]);
  const [users, setusers] = useState([]);

  async function loadUsers() {
    const response = await getUsersRequest();
    setusers(response.data);
  }

  async function loadEvents() {
    const response = await getEventRequest();
    setevents(response.data);
  }

  async function loadLocations() {
    try {
      const response = await getLocationsRequest();
      setlocations(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadCategories() {
    try {
      const response = await getCategoriesRequest();
      setcategories(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadOrganizers() {
    try {
      const response = await getOrganizersRequest();
      setorganizers(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getEventById = async (id) => {
    try {
      const response = await getEventByIdRequest(id);
      return response.data;
    } catch (err) {
      console.log(err + 'this the error');
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await getUserByIdRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  async function categoryIdByName(name) {
    const categories = await getCategoriesRequest();

    const category = categories.data.filter(
      (category) => category.name === name
    );

    return category[0].id;
  }

  async function organizerIdByName(name) {
    const organizers = await getOrganizersRequest();

    const organizer = organizers.data.filter(
      (organizer) => organizer.name === name
    );

    return organizer[0].id;
  }

  async function locationIDByName(name) {
    try {
      const locations = await getLocationsRequest();

      const location = locations.data.filter(
        (location) => location.name === name
      );

      return location[0].id;
    } catch (error) {
      console.log(error);
    }
  }

  async function getOrganizerById(id) {
    try {
      const response = await getOrganizerByIdRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const getLocationById = async (id) => {
    try {
      const response = await getLocationByIdRequest(id);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createEvent = async (event) => {
    try {
      const response = await createEventRequest(event);
      console.log(response.data);
      setevents([...events, event]);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (user) => {
    try {
      await createUserRequest(user);
      setusers([...users, user]);
    } catch (error) {
      console.log(error);
    }
  };

  const createLocation = async (newLocation) => {
    try {
      const response = await createLocationRequest(newLocation);

      setlocations([...locations, newLocation]);
    } catch (err) {
      console.log(err);
    }
  };

  const createOrganizer = async (newOrganizer) => {
    try {
      const response = await createOrganizerRequest(newOrganizer);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateLocation = async (id, newLocation) => {
    try {
      const response = await updateLocationRequest(id, newLocation);
    } catch (err) {
      console.log(err);
    }
  };

  const updateEvent = async (id, newEvent) => {
    try {
      const response = await updateEventRequest(id, newEvent);
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrganizer = async (id, newOrganizer) => {
    try {
      const response = await updateOrganizerRequest(id, newOrganizer);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, newUser) => {
    try {
      const response = await updateUserRequest(id, newUser);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLocation = async (id) => {
    try {
      const response = await deleteLocationRequest(id);
      setlocations(locations.filter((location) => location.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const response = await deleteEventRequest(id);
      setevents(events.filter((event) => event.event_id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrganizer = async (id) => {
    try {
      await deleteOrganizerRequest(id);
      setorganizers(organizers.filter((organizer) => organizer.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserRequest(id);
      setusers(users.filter((user) => user.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        locations,
        categories,
        organizers,
        users,
        loadEvents,
        loadLocations,
        loadCategories,
        loadOrganizers,
        loadUsers,
        getEventById,
        getOrganizerById,
        categoryIdByName,
        organizerIdByName,
        locationIDByName,
        getLocationById,
        getUserById,
        createLocation,
        createEvent,
        createOrganizer,
        createUser,
        updateEvent,
        updateOrganizer,
        updateLocation,
        updateUser,
        deleteEvent,
        deleteLocation,
        deleteOrganizer,
        deleteUser,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
}
