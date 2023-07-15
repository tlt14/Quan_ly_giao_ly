import { Route, Routes } from 'react-router-dom';
import './App.css';
import { privateRoutes, publicRoutes } from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
function App() {
  const userRoles = Cookies.get("user") ? JSON.parse(Cookies.get("user"))?.roles : {};
  const filteredRoutes = privateRoutes.filter(route => {
    const requiredRoles = route.roles;
    const hasRequiredRoles = requiredRoles.some(role => {
      if (Object.keys(userRoles).length === 1 && Object.keys(userRoles)[0] === 'GLV') {
        // Nếu người dùng chỉ có vai trò GLV, kiểm tra xem vai trò được yêu cầu là GLV hay không
        return role === userRoles.GLV;
      } else {
        // Ngược lại, kiểm tra xem người dùng có vai trò được yêu cầu hay không
        return Object.values(userRoles).includes(role);
      }
    });
    return hasRequiredRoles;
  });
  return (
    <>
    <Routes>
      {
        publicRoutes.map((route, index) => {
          const Layout = route.layout
          return <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>} />
        })
      }
      {
        filteredRoutes.map((route, index) => {
          const Layout = route.layout
          return <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>} />
        })
      }
    </Routes>
    <ToastContainer />
    </>
    
  );
}

export default App;
