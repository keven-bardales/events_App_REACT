import './App.css';
import { Route, Routes } from 'react-router-dom';
import EventPage from './pages/EventPage';
import LocationsPage from './pages/LocationsPage';
import OrganizersPage from './pages/OrganizersPage';
import UsersPage from './pages/UsersPage';
import EventForm from './components/eventsComponents/EventForm';
import LocationForm from './components/locationsComponents/LocationForm';
import OrganizerForm from './components/organizersComponents/OrganizerForm';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import { EventsContextProvider } from './context/EventsContext';
import UserForm from './components/usersComponents/UserForm';

function App() {
  return (
    <EventsContextProvider>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<EventPage></EventPage>}></Route>
        <Route path='/events' element={<EventPage></EventPage>}></Route>
        <Route path='/new_event' element={<EventForm></EventForm>}></Route>
        <Route path='/edit_event/:id' element={<EventForm></EventForm>}></Route>

        <Route
          path='/locations'
          element={<LocationsPage></LocationsPage>}
        ></Route>
        <Route
          path='/new_location'
          element={<LocationForm></LocationForm>}
        ></Route>
        <Route
          path='/edit_location/:id'
          element={<LocationForm></LocationForm>}
        ></Route>

        <Route
          path='/organizers'
          element={<OrganizersPage></OrganizersPage>}
        ></Route>
        <Route
          path='/new_organizer'
          element={<OrganizerForm></OrganizerForm>}
        ></Route>
        <Route
          path='/edit_organizer/:id'
          element={<OrganizerForm></OrganizerForm>}
        ></Route>

        <Route path='/users' element={<UsersPage></UsersPage>}></Route>
        <Route path='/new_user' element={<UserForm></UserForm>}></Route>
        <Route path='/edit_user/:id' element={<UserForm></UserForm>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </EventsContextProvider>
  );
}

export default App;
