import './App.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Transaction from './components/Transaction';
import Welcome from './components/Welcome';
const App=()=> {
  return (
    <div className="App">
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar/>
          <Welcome />
        </div>
      </div>
    </div>
  );
}

export default App;
