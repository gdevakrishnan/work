import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Transactions from './components/Transactions';
import Welcome from './components/Welcome';
import Contact from './components/Contact';
const App=()=> {
  return (
    <div className="App">
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar/>
          <Welcome />
          <Transactions />
          <Services/>d
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
