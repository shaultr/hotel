import styles from './style.module.css';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
