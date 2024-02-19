const express = require("express");
let db = require("./dbs/Data");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();

// database connections =>
db.mongodb();

const app = express();

// middlewares =>
app.use(express.static("public"));
app.set("views engine", "ejs");
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride("_method"))

// routers =>
app.get("/login", async (req, res) => {
  res.render("login.ejs");
})

app.post("/login", (req, res) => {
  let data = req.body;
  console.log("login data -> ", data)
})

app.get("/dashboard", async (req, res) => {
  try {
    let NotesData = await db.note.find();
    res.render("dashboard.ejs", { NotesData });
  } catch (error) {
    console.log(error)
  }
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
})

app.get("/update:id", async (req, res) => {
  try {
    let { id } = req.params;
    let NotesData = await db.note.find();
    NotesData.filter((element) => {
      if (element._id.toString() === id) {
        res.render("update.ejs", { element });
      }
    })
  } catch (error) {
    console.log(error)
  }
})


app.post("/create", async (req, res) => {
  try {
    let insertData = await req.body;
    let note1 = new db.note(insertData)
    await note1.save();
    res.redirect("/dashboard")
  } catch (error) {
    console.log(error)
  }
})

app.put("/update:id", async (req, res) => {
  try {
    let { id } = req.params;
    await db.note.updateOne({ _id: id }, req.body)
    res.redirect("/dashboard")
  } catch (error) {
    console.log(error)
  }
})

app.delete("/delete:id", async (req, res) => {
  try {
    let { id } = req.params;
    await db.note.deleteOne({ _id: id })
    res.redirect("/dashboard")
  } catch (error) {
    console.log(error)
  }
})

// port =>
app.listen(process.env.PORT || 8080, () => {
  console.log("Server is live on -> ", 3000);
});