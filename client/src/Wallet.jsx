import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  private_key,
  set_Private_key,
}) {
  async function onChange(evt) {
    const private_key = evt.target.value;
    set_Private_key(private_key);
    const publickKey = toHex(secp.getPublicKey(private_key));
    setAddress(publickKey);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${private_key}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private
        <input
          placeholder="write your private key"
          value={private_key}
          onChange={onChange}
        ></input>
      </label>
      <label>public:{address.slice(0, 10)}</label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
