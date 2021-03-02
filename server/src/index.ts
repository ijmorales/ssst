import express from "express";
import "dotenv-safe/config";

const app = express();
app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Hello world!!!');
})

app.listen(parseInt(process.env.PORT), () => {
  console.log(`Server started on localhost:${process.env.PORT}`);
});