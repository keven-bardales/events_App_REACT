import './App.css';
import EventPage from './pages/EventPage';
import EventsList from './EventsList';
import { Route, Routes } from 'react-router-dom';
import EventForm from './pages/EventForm';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<EventPage></EventPage>}></Route>
        <Route path='/events' element={<EventForm></EventForm>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
}

export default App;

/**<EventsList></EventsList>; 
 * 
 * 
 *   <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<EventPage></EventPage>}></Route>
        <Route path='/events' element={<EventForm></EventForm>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
 * 
*/
