import './Styles/index.css';
import './Styles/font.css';
import 'react-toastify/dist/ReactToastify.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { store } from './Redux/store.js';
import App from './App.jsx';
import { IoMdClose } from 'react-icons/io';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={1800}
        className={'toastifyCustomClass'}
        closeButton={false}
        limit={5}
        theme="light"
        hideProgressBar={true}
        closeOnClick={true}
      />
      <Tooltip />
    </BrowserRouter>
  </Provider>
);

