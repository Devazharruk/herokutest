const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./usermodel.cjs");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cors());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  const users = await UserModel.find({});
  res.render("read", { users });
});

app.post("/create", async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const created = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      image: req.body.image,
    });
    res.redirect("/read");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error creating user" });
  }
});
app.get("/delete/:id", async (req, res) => {
  await UserModel.deleteOne({ _id: req.params.id });
  res.redirect("/read");
});
app.get("/update/:id", async (req, res) => {
  const user =await UserModel.findOne({ _id: req.params.id });
  res.render("update",{user})
});
app.post("/update/:id", async (req, res) => {
  const {email,image,password,name}=req.body;
  const user =await UserModel.updateOne({ _id: req.params.id },{email,image,password,name},{new:true});
  res.redirect("/read")
});

app.get("/create", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
