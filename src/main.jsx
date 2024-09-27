import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root.jsx';
import RecordDetail from './components/RecordDetail/RecordDetail.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import CustomProvider from './components/CustomContext/CustomContext.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // هنا قمنا بتصحيح الخاصية
        element: <HomePage />,
      },
      {
        path: 'tracker', // إزالة '/' لأنه يتم تضمينه تلقائيًا
        element: <App />,
      },
      {
        path: 'tracker/:recordID', // إزالة '/' لأنه يتم تضمينه تلقائيًا
        element: (
          <CustomProvider>
            <RecordDetail />
          </CustomProvider>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
