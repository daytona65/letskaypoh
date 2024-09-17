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
import { data, userData } from './models/dummyData.ts';
import VisitConfirmed from './pages/VisitConfirmed/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBarWrapper isLoggedIn={true} />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile user={userData[0]} />,
      },
      {
        path: "/register-visit/:seniorId",
        element: <RegisterVisit user={userData[0]}/>,
      },
      {
        path: "/visits",
        element: <Visits />,
      },
      {
        path: "/complete",
        element: <CompleteVisit />,
      },
      {
        path: "/visit-confirmed",
        element: <VisitConfirmed user={userData[0]} senior={data[0]} />,
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
  // need to add userProvider, seniorProvider
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
