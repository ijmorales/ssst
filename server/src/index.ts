import express from "express";
import "dotenv-safe/config";

const app = express();
app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Now nodemon is working!');
})

app.listen(parseInt(process.env.PORT) || 8080, () => {
  console.log(`Server started on localhost:${process.env.PORT}`);
});