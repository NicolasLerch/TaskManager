import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import LoginForm from './Components/LoginForm/LoginForm.jsx'
import Home from './Components/Home/Home.jsx'
import Project from './Components/Project/Project.jsx';
import './index.css'
import NewProjectForm from './Components/NewProjectForm/NewProjectForm.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path:"home/project/:projectId",
    element: <Home />
  },
  {path: '/project/new',
  element: <NewProjectForm />}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
