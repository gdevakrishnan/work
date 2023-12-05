const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection URL. Replace '<YOUR_MONGODB_URI>' with your actual MongoDB connection string.
// const MONGODB_URI = "mongodb+srv://bhshrihari:Shrihari@21@cluster0.omvbtpl.mongodb.net/"
const MONGODB_URI = "mongodb://127.0.0.1:27017/work";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true }
});

const Contact = mongoose.model("Contact", contactSchema);

const transactionSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true }
}, {timestamps: true});

const Transactions = mongoose.model("Transactions", transactionSchema, "Transactions");

app.use(bodyParser.json());
app.use(cors());

app.post("/api/submit-form", (req, res) => {
  const { email, subject, message } = req.body;

  const newContact = new Contact({
    email,
    subject,
    message,
  });

  newContact
    .save()
    .then(() => {
      res.json({ message: "Form submitted successfully." });
    })
    .catch((err) => {
      console.error("Error saving form data:", err);
      res.status(500).json({ error: "An error occurred while saving the form data." });
    });
});

app.post("/api/add-transaction", (req, res) => {
  const { from, to, amount } = req.body;

  const newTransaction = new Transactions({
    from,
    to,
    amount
  });

  newTransaction
    .save()
    .then(() => {
      res.status(200).json({message: "Transaction Completed"});
    })
    .catch((e) => {
      res.status(400).json({message: e.message});
    })
});

app.get("/api/all-transactions", async (req, res) => {
  try {
    const allTransactions = await Transactions.find({});
    res.status(200).json({transactionDetails: allTransactions});
  } catch (e) {
    res.status(400).json({message: e.message});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});










