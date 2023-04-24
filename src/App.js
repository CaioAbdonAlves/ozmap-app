import 'react-toastify/dist/ReactToastify.css';
import RoutesApp from './routes';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <RoutesApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
