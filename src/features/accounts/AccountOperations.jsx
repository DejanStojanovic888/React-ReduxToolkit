import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deposit, withdraw, payLoan, requestLoan } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  // const account = useSelector((store) => store.account);
  const { loan: currentLoan, loanPurpose: currentLoanPurpose, balance, isLoading } = useSelector((store) => store.account);

  function handleDeposit() {
    if (!depositAmount || !currency) return;

    // ovde ako DISPATCH vidi da se return-uje FUNKCIJA
    // kada Redux vidi to znace da je ta funkcija THUNK(middleware) 
    // i onda ce PRVO pozvati tu funkciju(nece odmah dispatch-ovati action to the store) 
    // ako pak primi objekat umesto FUNKCIJE onda ce odmah dispatch-ovati taj objekat to the store
    // Dakle middleware gleda šta je argument dispatch-a — ako je funkcija, zna da je thunk.
    dispatch(deposit(depositAmount, currency));  // odavde ide na accountSlice.jsx i tu ide na PRVO pa na DRUGO
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          {/* disabled is a standard HTML attribute — when it's true, 
          the button is unclickable and visually grayed out. */}
          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 && (
          <div>
            <span>Pay back ${currentLoan}({currentLoanPurpose})</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
