import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../pages/login";
import Portfolio from "../pages/portfolio";
import Cadastro from "../pages/cadastro";

const SiteRouterProvider = () => {

  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/portfolio/" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default SiteRouterProvider;