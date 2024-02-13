import styles from './style.module.css';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';
import Admin from './pages/admin';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Layout />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;