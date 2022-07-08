import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "./components/Nav";
// import Container from "./components/Container";
import SearchCity from "./components/SearchCity";

function App() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">
        {/*<Container />*/}
        <SearchCity />
      </header>
    </div>
  );
}

export default App;
