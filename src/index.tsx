import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import ActivePuzzle from './components/ActivePuzzle';
import { store } from './redux/store';

const container = document.getElementById('app-root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ActivePuzzle />
  </Provider>
);