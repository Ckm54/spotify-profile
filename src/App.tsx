import React from "react"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import { token } from "./api/spotify";
import { Container } from "@chakra-ui/layout";

function App() {

  const [accessToken, setAccessToken] = React.useState<string>('');

  React.useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <>
      {accessToken ? <Dashboard /> : <Login />}
    </>
  )
}

export default App
