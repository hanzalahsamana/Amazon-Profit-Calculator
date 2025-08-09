
import './Styles/app.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

export default function App() {
  return (
    <div className='max-w-[1800px]'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}