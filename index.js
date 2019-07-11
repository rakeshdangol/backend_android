const Express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const handler = require("./handler");
const addtocart = require("./addtocart")


const express = new Express();
express.use(cors());
express.use(bodyParser.json());
express.use(Express.static(__dirname));

express.post("/api/register",handler.register);
express.post("/api/login",handler.login);
express.get("/api/getUserByEmail/:email",handler.getUserByEmail);
express.post("/api/petAdd",handler.petAdd);
express.post("/api/uploadimage",handler.uploadImage);
express.get("/api/getallpet",handler.getAllpet);
express.put("/api/updateUser/:email",handler.updateUser);
express.delete("/api/deleteUser/:email",handler.deleteUser);
express.put("/petUpdate/:id",addtocart.petUpdate);
express.delete("petDelete/:id",addtocart.petDelete);

express.post("/api/Addtocart",addtocart.Addtocart);
express.get("/api/getdetailsBuy/:email",addtocart.getAddtocarts);
express.put("/api/Buypet/:email/:id",addtocart.Buypet);



express.listen(4000, () => console.log("Server running on port 4000"));