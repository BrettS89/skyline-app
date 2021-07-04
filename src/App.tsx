import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/loading';
import Router from './routing';
import Header from './components/header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="App-main">
          <div className="App-main-content">
            <Router />
          </div>
        </div>
        <Loading />
      </div>
    </BrowserRouter>
  );
}

export default App;
