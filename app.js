const express = require("express");
const CredentialModel = require("./models").Credential;
const UserModel = require("./models").userDetails;

const app = express();
const PORT = 8087;
app.get("/", (req, res) => {
  res.status(200).json({
    status: 1,
    message: "welcome to homepage",
  });
});
app.get("/users", (req, res) => {
  UserModel.findAll({ include: CredentialModel })
    .then((data) => {
      res.status(200).json({
        status: 1,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        message: "there is some error!!",
      });
    });
});
app.get("/credential", (req, res) => {
  CredentialModel.findAll({ include: UserModel })
    .then((data) => {
      console.log(data);
      res.status(200).json({
        status: 1,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        message: "there is some error!!",
      });
    });
});
app.listen(PORT, () => {
  console.log("Application is listening at :" + PORT);
});
