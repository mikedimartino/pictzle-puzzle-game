import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import ActivePuzzle from './components/ActivePuzzle';
import NewPuzzleSettings from './components/NewPuzzleSettings';
import { store } from './redux/store';

const container = document.getElementById('app-root') as HTMLInputElement;
const root = createRoot(container);

const router = createHashRouter([
  {
    path: '/',
    element: <NewPuzzleSettings />,
  },
  {
    path: 'puzzle',
    element: <ActivePuzzle />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
