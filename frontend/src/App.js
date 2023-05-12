import {useState} from 'react';
import LoginPage from "./components/LoginPage";
import AadharView from "./components/AadharView";
import AadharCreate from "./components/AadharCreate";

function App() {
  const [loggedEmail, setLoggedEmail] = useState(false);;

  if (loggedEmail) {
    if (loggedEmail === "admin") {
      return <AadharCreate />;
    }

    return <AadharView email={loggedEmail} />;
  }

  return <LoginPage setLoggedEmail={setLoggedEmail} />;
}

export default App;
