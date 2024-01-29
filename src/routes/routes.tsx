import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../pages/login";
import Portfolio from "../pages/portfolio";
import ImageUploadCard from '../components/ModalComponet/components/CardInputFile/intex';



const SiteRouterProvider = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/portfolio/" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default SiteRouterProvider;