import "./App.css";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "bootstrap/dist/css/bootstrap.min.css";
const App = observer(() => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
});

export default App;
