import Router from "./routes/Router";
import { ELements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;
