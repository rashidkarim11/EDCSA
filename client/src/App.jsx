import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [private_key, set_Private_key] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        private_key={private_key}
        set_Private_key={set_Private_key}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
