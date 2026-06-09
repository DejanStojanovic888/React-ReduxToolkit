import { useSelector } from "react-redux";

function Customer() {
  // if the state in store changes then component rerenders
  const customer = useSelector((store) => store.customer.fullName);  
  console.log(customer)
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
