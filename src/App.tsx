import React from "react"
import Login from "./pages/Login"
import Home from "./pages/Home";
import { token } from "./api/spotify";

function App() {

  const [accessToken, setAccessToken] = React.useState<string>('');

  React.useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <>
      {accessToken ? <Home /> : <Login />}
    </>
  )
}

export default App
