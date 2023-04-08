const express = require("express");
const app = express();
const port = 8000; // this is our port

app.use(express.json()); // this is new!
app.use(express.urlencoded({ extended: true })); // this is new!

const users = [
  { firstName: "Reimu", lastName: "Hakurei" },
  { firstName: "Marisa", lastName: "Kirisame" },
  { firstName: "Sanae", lastName: "Kochiya" },
  { firstName: "Sakuya", lastName: "Izayoi" },
  { firstName: "Momiji", lastName: "Inubashiri" }
];

app.get("/api/users", (req, res) => { 
  res.json(users);
});

app.post("/api/users", (req, res) => {
  // we can use req.body to access POST data
  console.log(req.body);
  // assuming the data is in the format of { firstName: "first", lastName: "last" }
  users.push(req.body);
  res.json({ status: "ok" });
});

app.get("/api/users/:id", (req, res) => {
  // we can access the value of the id parameter in req.params
  console.log(req.params.id);
  // assuming this id is the index of the users array we could return one user this way
  res.json(users[req.params.id]);
});

app.put("/api/users/:id", (req, res) => {
  // assuming this id is the index of the users array we could replace the user like so
  users[req.params.id] = req.body;
  res.json({ status: "ok" });
});

app.delete("/api/users/:id", (req, res) => {
  // assuming this id is the index of the users array we could remove the user like so
  users.splice(req.params.id, 1);
  res.json({ status: "ok" });
});

// req is short for request
// res is short for response
app.get("/api", (req, res) => {
  res.json({ message: "Hello" });
});

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));
