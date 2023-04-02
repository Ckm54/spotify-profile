import React from "react"
import Auth from "./pages/Auth"
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
      {auth ? <Dashboard /> : <Auth />}
    </div>
  )
}

export default App
