const mongoose = require("mongoose");
const express = require("express");

const distributor = mongoose.model("Distributor");
const customers = mongoose.model("Customer");
const venue = mongoose.model("Venue");
const router = express.Router();
//adding customers

router.post("/addcustomer", (req, res, next) => {
  const { name, phone, email, city, venuetype, user } = req.body;
  if (!name || !email || !phone || !city || !venuetype) {
    return res.status(401).json({ error: "please fill all the details" });
  }
  customers
    .findOne({
      $or: [{ email: email }, { phone: phone }],
    })
    .then((result) => {
      if (result) {
        return res
            .status(422)
            .json({error: "Customer Already exist with this email or phone"});
      }
      const cusomer = new customers({
        name,
        email,
        city,
        phone,
        venuetype,
        addedby: user._id,
      });

      cusomer
        .save()
        .then((result) => {
          return res
            .status(200)
            .json({ success: "customer added successfully" });
        })
        .catch((err) => res.status(400).json({ error: err }));
    })
    .catch((err) => res.status(400).json({ error: err }));
});

//edit area if something submitted mistakenely

router.put("/editarea", (rea, res, next) => {
  const { venueid, area } = req.body;
  venue
    .findByIdAndUpdate(
      { venueid },
      {
        $set: {
          area: area,
        },
      }
    )

    .then((result) => {
      if (result) {
        return res.json(200).json({ success: "Area Added successfully" });
      }
      return res.json(422).json({ success: "Something went wrong" });
    });
});

// router.put('/addarea',(rea,res,next)=>{
//     const {venueid,area} = req.body;
//     venue.findByIdAndUpdate({venueid},{$set:{
//             area:area
//         }})
//
//         .then(result=>{
//             if(result){
//                 return res.json(200).json({success: "Area Added successfully"})
//             }
//             return res.json(400).json({success: "Something went wrong"})
//         })
// })

//adding venue

router.post("/addvenue", (req, res, next) => {
  const {
    bycustomer,
    preatpreading,
    servicetype,
    area,
    areatype,
    areacovered,
    sanitizationDate,
  } = req.body;

  if (
    !bycustomer ||
    !preatpreading ||
    !servicetype ||
    !area ||
    !areatype ||
    !areacovered ||
    !sanitizationDate
  ) {
    res.status(401).json({ error: "Please Fill All The Details" });
  }
  const newvenue = new venue({
    bycustomer,
    preatpreading,
    servicetype,
    area,
    areacovered,
    areatype,
    sanitizationDate,
  });
  newvenue
    .save()
    .then((res) => {
      return res.status(200).json({ success: "venue added successfully" });
    })
    .catch((err) => res.json(500).json({ error: err }));
});

//adding and deleting servicerecords

router.put("/addservicerecord", (req, res, next) => {
  const { date, venueid } = req.body;
  venue
    .findByIdAndUpdate(
      venueid,
      {
        $push: { serviceDate: date },
      },
      { new: true }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/deleteservicerecord", (req, res, next) => {
  const { date, venueid } = req.body;
  venue
    .findByIdAndUpdate(
      venueid,
      {
        $pull: { serviceDate: date },
      },
      { new: true }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/addsanitizationdate", (req, res, next) => {
  const { venueid, date } = req.body;
  if (!venueid || !date) {
    return res.status(401).json({ error: "please fill all the details" });
  }

  venue
    .findByIdAndUpdate(
      venueid,
      {
        $push: {
          sanitizationDate: date,
        },
      },
      { new: true }
    )
    .then((res) => {
      return res.status(200).json({ success: "successfully added atpreading" });
    })
    .catch((err) => res.status(422).json({ error: err }));
});

router.put("/addatpreadings", (req, res, next) => {
  const { date, venueid, atpreading } = req.body;
  if (!date || !venueid || !atpreading) {
    return res.status(401).json({ error: "please fill all the details" });
  }

  venue
    .findByIdAndUpdate(
      venueid,
      {
        $push: { atpreadings: { date, atpreading } },
      },
      { new: true }
    )
    .then((res) => {
      return res.status(200).json({ success: "successfully added atpreading" });
    })
    .catch((err) => res.status(422).json({ error: err }));
});

module.exports = router;

