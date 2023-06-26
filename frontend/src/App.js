import "./App.css";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { check } from "./API/userApi";
import { Context } from ".";
const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          console.log("я попал сюда");
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
    }, 1000);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
});

export default App;
