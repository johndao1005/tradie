
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import JobList from './pages/job_list/JobList';
import JobDetails from './pages/job_details/JobDetails';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobList />} exact={true} />
        <Route path="/job/:id" element={<JobDetails />} exact={true} />
        <Route path="*" element={<JobList to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
