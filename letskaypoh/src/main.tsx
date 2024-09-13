import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Entry from './pages/Entry/index.tsx';
import Home from './pages/Home/index.tsx';
import Register from './pages/Register/index.tsx';
import RegistrationSuccess from './pages/RegistrationSuccess/index.tsx';
import { NavBarWrapper } from './components/NavBar.tsx';
import Profile from './pages/Profile/index.tsx';
import RegisterVisit from './pages/RegisterVisit/index.tsx';
import Visits from './pages/Visits/index.tsx';
import CompleteVisit from './pages/CompleteVisit/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBarWrapper />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/register-visit",
        element: <RegisterVisit />,
      },
      {
        path: "/visits",
        element: <Visits />,
      },
      {
        path: "/complete",
        element: <CompleteVisit />,
      },
    ]
  },
  {
    path: "/entry",
    element: <Entry />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-success",
    element: <RegistrationSuccess />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
