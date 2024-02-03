import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../pages/login";
import Portfolio from "../pages/portfolio";
import Cadastro from "../pages/cadastro";
import Discover from '../pages/discover';
import { AuthProvider } from '../providers/AuthProvider';
import ProtectedRoutes from '../components/ProtectedRoutes';

const SiteRouterProvider = () => {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/portfolio/"
            element={
              <ProtectedRoutes>
                <Portfolio />
              </ProtectedRoutes>
            }
          />
          <Route path="/descobrir/"
            element={
              <ProtectedRoutes>
                <Discover />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default SiteRouterProvider;