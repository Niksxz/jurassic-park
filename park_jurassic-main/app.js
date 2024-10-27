const express = require('express')
const app = express()
const path = require("path")
const port = 3000
const collection = require("./config")
const { PassThrough } = require('stream')
const { url } = require('inspector')
const bcrypt = require("bcrypt")

app.set("view engine", "EJS")
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static('public'));
app.use(express.static('imagens'));





app.get('/', (req, res) => {
  res.render("index")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/cadastro", (req, res) => {
  res.render("cadastro")
})



app.post("/cadastro", async (req, res) => {
  const data = {
    name: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  const existingUser = await collection.findOne({ email: data.email });

  if (existingUser) {

    res.send('User already exists. Please choose a different email.');

} else {

    // Hash the password using bcrypt
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword; // Replace the original password with the hashed one

    const userdata = await collection.insertMany(data);
    console.log(userdata);
    const check = userdata
    res.render("home", {check})
}

})


app.post("/login", async (req, res) => {
  try {
      const check = await collection.findOne({ email: req.body.email });
      if (!check) {
          res.send("User name cannot found")
      }
      // Compare the hashed password from the database with the plaintext password
      const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
      if (!isPasswordMatch) {
          res.send("wrong Password");
      }
      else {
          res.render("home", {check});
         
      }
  }
  catch(e) {
      res.send("wrong Details");
      console.log(e)
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
  