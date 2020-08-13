const mongoose = require("mongoose");
const express = require("express");

const distributor = mongoose.model("Distributor");
const customers = mongoose.model("Customer");
const router = express.Router();
//see all distributors
router.get("/distributors", (req, res, next) => {
  distributor.find({})
     .
  then((result) => {
    if (!result) {
      return res.status(404).json({ error: "no distributors found" });
    }
    return res.status(200).send(result);
  });
});

//see all customers
router.get("/customers", (req, res, next) => {
  customers.find({}).then((result) => {
    if (!result) {
      return res.status(404).json({ error: "no distributors found" });
    }
    return res.status(200).send(result);
  });
});
router.post("/adddistributor", (req, res, next) => {
  const { name, phone, email, city,enabledservices } = req.body;
  if (!name || !email || !phone || !city || !enabledservices) {
    return res.status(401).json({ error: "please fill all the details" });
  }
  distributor
      .findOne({
        $or: [{ email: email }, { phone: phone }],
      })
      .then((result) => {
        if (result) {
          return res
              .status(422)
              .json({error: "Distributor Already exist with this email or phone"});
        }
        const dist = new distributor({
          name,
          email,
          city,
          phone,
enabledservices
        });

        dist
            .save()
            .then((result) => {
              return res
                  .status(200)
                  .json({ success: "distributor added successfully",result });
            })
            .catch((err) => res.status(401).json({ error: err }));
      })
      .catch((err) => res.status(400).json({ error: err }));
});

//update distributor
router.put("/distributorupdate/:id", (req, res, next) => {
  const { name, phone, email, city,enabledservices } = req.body;
  distributor.findByIdAndUpdate(req.param.id,{
    $set:{
      name:name,
      phone:phone,
      email:email,
      city:city,
      enabledservices:enabledservices
    }
  }).then((result) => {
    return res.status(200).json({success:result})
  })
      .catch(err=>{
        return res.status(401).json({error:err})
      });
});

//update customer
router.put("/customerupdate/:id", (req, res, next) => {
  const { name, phone, email, city,addedby,venuetype } = req.body;
  customers.findByIdAndUpdate(req.params.id,{
    $set:{
      name:name,
      phone:phone,
      email:email,
      city:city,
      addedby:addedby,
      venuetype:venuetype
    }
  }).then((result) => {
    return res.status(200).send(result)
  })
      .catch(err=>{
        return res.status(401).json({error:err})
      });
});

module.exports = router;
