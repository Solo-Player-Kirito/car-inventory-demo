const multer = require("multer");
const { storage } = require("../../utils/cdn");
const upload = multer({ storage: storage });
const express = require("express");
const { authMiddleware } = require("../../middleware/auth.middleware");
const router = express.Router();
const {
  addBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  addModel,
  updateModel,
  deleteModel,
  getModels,
  addCar,
  updateCar,
  deleteCar,
  getCars,
} = require("../../controller/cars.controller");
// below is the brands
router.post("/brand/add", authMiddleware, upload.single("image"), addBrand);
router.post(
  "/brand/update",
  authMiddleware,
  upload.single("image"),
  updateBrand
);
router.delete("/brand/delete", authMiddleware, deleteBrand);
router.get("/brand/all", getAllBrands);
// below is the models
router.post("/model/add", authMiddleware, upload.single("image"), addModel);
router.post(
  "/model/update",
  authMiddleware,
  upload.single("image"),
  updateModel
);
router.delete("/model/delete", authMiddleware, deleteModel);
router.get("/model/all", getModels);
// below is the cars
router.post("/car/add", authMiddleware, upload.single("image"), addCar);
router.post("/car/update", authMiddleware, upload.single("image"), updateCar);
router.delete("/car/delete", authMiddleware, deleteCar);
router.get("/car/all", getCars);

module.exports = router;
