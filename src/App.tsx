import React from "react"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import { token } from "./api/spotify";

function App() {

  const [accessToken, setAccessToken] = React.useState<string>('');

  React.useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <div>
      {accessToken ? <Dashboard /> : <Login />}
    </div>
  )
}

export default App
