import './App.css';
import MainMap from "./mainmap";
function App() {
  return (
    <div className='App'>
    <div className="App-banner">
        <img src="images/MLogo.png" className="App-logo" alt="logo" />
        <p className='textLogo'>This is a test</p>
    </div>
    <div className='App-body'>
          <div id='content'>

              <MainMap />
          </div>
    </div>
    </div>
  );
}

export default App;
