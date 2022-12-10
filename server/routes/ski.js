const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const { requireAuth } = require("../middleware/auth");
const SkiJumper = require("../models/SkiJumper");
const SkiJumperList = require("../models/SkiJumperList");
const SkiJumpingCompetition = require("../models/SkiJumpingCompetition");
const User = require("../models/User");

router.get("/get/:collection", async (req, res) => {
  const collection = req.params.collection;
  try {
    if (collection == "jumpers") {
      const skiJumpers = await SkiJumper.find({}).populate("userId");
      return res.status(StatusCodes.OK).json(skiJumpers);
    }
    if (collection == "jumper-list") {
      const skiJumperList = await SkiJumperList.find({}).populate("userId");
      return res.status(StatusCodes.OK).json(skiJumperList);
    }
    if (collection == "jumping-competition") {
      const skiJumpingCompetition = await SkiJumpingCompetition.find(
        {}
      ).populate("userId");
      return res.status(StatusCodes.OK).json(skiJumpingCompetition);
    } else {
      throw new Error("wrong collection name");
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get("/getById/:collection/:id", async (req, res) => {
  const collection = req.params.collection;
  const id = req.params.id;

  try {
    if (!id) {
      throw new Error("there is no id");
    }
    if (collection == "jumper-list") {
      const skiJumperList = await SkiJumperList.find({
        skiJumpingCompetitionId: id,
      })
        .populate("userId")
        .populate("skiJumperId");
      return res.status(StatusCodes.OK).json(skiJumperList);
    }
    if (collection == "jumping-competition") {
      const skiJumpingCompetition = await SkiJumpingCompetition.find({
        _id: id,
      }).populate("userId");
      return res.status(StatusCodes.OK).json(skiJumpingCompetition);
    } else {
      throw new Error("wrong collection name");
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.post("/add/:collection", async (req, res) => {
  const collection = req.params.collection;
  try {
    if (collection == "jumper") {
      let { firstName, lastName, age, personalId, userId } = req.body;
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      const jumper = await SkiJumper.create({
        firstName,
        lastName,
        age,
        personalId,
        userId,
      });
      return res.status(StatusCodes.CREATED).json(jumper.firstName);
    }
    if (collection == "jumper-list") {
      let { skiJumpingCompetitionId, skiJumperId, userId } = req.body;
      const existing = await SkiJumperList.findOne({
        skiJumpingCompetitionId,
        skiJumperId,
      });
      if (existing) {
        throw new Error("jumer is already added");
      }
      const jumperList = await SkiJumperList.create({
        skiJumperId,
        skiJumpingCompetitionId,
        userId,
      });
      return res.status(StatusCodes.CREATED).json("list created");
    }
    if (collection == "jumping-competition") {
      let { name, city, startDate, userId } = req.body;
      name = name.charAt(0).toUpperCase() + name.slice(1);
      city = city.charAt(0).toUpperCase() + city.slice(1);
      const jumpingCompetition = await SkiJumpingCompetition.create({
        name,
        city,
        startDate,
        userId,
      });
      return res.status(StatusCodes.CREATED).json(jumpingCompetition.name);
    } else {
      throw new Error("wrong collection name");
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete("/delete/:collection/:id", async (req, res) => {
  const collection = req.params.collection;
  const id = req.params.id.toString();
  try {
    if (collection == "jumper") {
      await SkiJumper.findByIdAndDelete(id);
      return res.status(StatusCodes.OK).json("jumper has been deleted");
    }
    if (collection == "jumper-list") {
      await SkiJumperList.findByIdAndDelete(id);
      return res.status(StatusCodes.OK).json("jumper list has been deleted");
    }
    if (collection == "jumping-competition") {
      await SkiJumpingCompetition.findByIdAndDelete(id);
      return res
        .status(StatusCodes.OK)
        .json("jumping competitions has been deleted");
    } else {
      throw new Error("wrong collection name");
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

module.exports = router;
