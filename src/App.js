import './App.css';
import DetailView from './Components/DetailView';
import WeekView from './Components/WeekView';
import Calendar from './Components/Calendar';
import Navbar from './Components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-12'>
        <div className='md:col-span-4 lg:col-span-3 mt-2 p-3'>
          <Calendar />
        </div>
        <div className='md:col-span-8 lg:col-span-9'>
          <Routes>
            <Route path={'/'} element={<Navigate to={'/habits/detail'} />} />
            <Route path='/habits/week' element={<WeekView />}></Route>
            <Route path='/habits/detail' element={<DetailView />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
