import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "./components/Nav";
import Container from "./components/Container";
import CityTable from "./components/CityTable";

function App() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">
        <LeftRightLayout left={<Container />} right={<CityTable />}>
          Hello
        </LeftRightLayout>
      </header>
    </div>
  );
}

function LeftRightLayout(props) {
  return (
    <div className="row">
      <div className="col">{props.left}</div>
      <div className="col">{props.right}</div>
    </div>
  );
}

export default App;
