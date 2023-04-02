import React from "react"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";

function App() {

  const [auth, setAuth] = React.useState<boolean>(false);

  React.useEffect(() => {
    const verifier = window.localStorage.getItem('verifier');
    if(verifier) {
      console.log(verifier)
      setAuth(true)
    }
  })

  return (
    <div>
      {auth ? <Dashboard /> : <Login />}
    </div>
  )
}

export default App
