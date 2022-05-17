import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Cards from './components/Cards';
import Chart from './components/Chart';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <Cards />
      <Chart />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
