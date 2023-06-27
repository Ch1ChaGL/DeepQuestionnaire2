import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { check } from "./API/userApi";
import { Context } from ".";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import "./App.css";
const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Проверка идет");
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch(() => {
        user.setUser({});
        user.setIsAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <MyNavbar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
});

export default App;
