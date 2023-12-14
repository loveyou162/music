import React, { useEffect } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home/Home';
import RootLayout, { loader as rootLoader } from './Pages/root';
import Authenticate, { action as authAction } from './Pages/Authenticate';
// import { tokenLoader } from './Util/auth';
import ErrorPage from './Pages/Error';
import AuthForm from './Component/Layout/authForm';
import { action as logoutAction } from './Pages/Logout';
import RootAdmin from './Pages/AdminPage/RootAdmin';
import Dashboard from './Component/Layout/Admin/Dashboard';
import Category from './Component/Layout/Admin/Category';
import User from './Component/Layout/Admin/User';
import Song from './Component/Layout/Admin/Song';
import Gallery from './Component/Layout/Admin/Gallerys';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      loader: rootLoader,
      children: [
        { index: true, element: <Home /> },
        { path: 'auth', element: <AuthForm />, action: authAction },
        { path: 'logout', action: logoutAction },
        {
          path: 'admin',
          element: <RootAdmin />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'user', element: <User /> },
            { path: 'category', element: <Category /> },
            { path: 'song', element: <Song /> },
            { path: 'gallery', element: <Gallery /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
