const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0497092816ee0d36ad5ecfcd137cb82c42e8b2f97b8561374bd80c5502be620d756ec566c7dd6a0139746afd6aa8737f0c4d2f490e79aa18a56bff475bf8cb33b5": 100,
  "0406ab6a1ca2217b615f25021efa4a95a2ba0a9ba00c08632005c4720291cbab195e6bd92a9eae99198921c1bf40656b06a2834b48ac0c54b1ad8c0ae61c19779e": 50,
  "043e61de303c6185bc775ea84c81852b509688070cbe89df8a5b75d9267609fcb53346b7c37d9ba9bc1dec3590a4868d24359a707f0355dd7ff44466cf80da3cc7": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
  console.log(sender, "sender");

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
