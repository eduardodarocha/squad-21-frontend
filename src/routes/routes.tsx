import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../pages/login";
import Portfolio from "../pages/portfolio";
import Cadastro from "../pages/cadastro";
import Discover from '../pages/discover';

const SiteRouterProvider = () => {

  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/portfolio/" element={<Portfolio />} />
        <Route path="/descobrir/" element={<Discover />} />
      </Routes>
    </Router>
  );
}

export default SiteRouterProvider;