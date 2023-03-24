import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';

import ActivePuzzle from './components/ActivePuzzle';
import Header from './components/Header';
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

const PageLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex-grow: 1;
  position: relative;
`;

root.render(
  <Provider store={store}>
    <PageLayout>
      <Header />
      <Main>
        <RouterProvider router={router} />
      </Main>
    </PageLayout>
  </Provider>
);
