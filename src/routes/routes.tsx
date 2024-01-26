import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../pages/login";


const SiteRouterProvider = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default SiteRouterProvider;