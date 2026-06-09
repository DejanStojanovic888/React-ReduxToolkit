import CreateCustomer from "./CreateCustomer.jsx";
import Customer from "./Customer.jsx";
import AccountOperations from "./AccountOperations.jsx";
import BalanceDisplay from "./BalanceDisplay.jsx";

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
