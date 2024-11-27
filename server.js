// const mysql
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(`UNCAUGHT EXCEPTION 🔥 Shutting down.....`);
  console.log(err.name, err.message);
  const stackLines = err.stack.split("\n");
  console.log(stackLines[1]);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

app.get("/test", (req, res) => {
  res.status(200).send("HI");
});

const port = process.env.PORT;

//listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
