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
} = require("../controller_servies/cars.services");
const { uploadToCloudinary } = require("../utils/cdn");
module.exports = {
  // Brand Controllers
  addBrand: async (req, res) => {
    try {
      const { name } = req.body;
      let image;
      if (req.file) {
        image = req.file.path;
      }
      //   const file = req.file.path;
      //   const url = await uploadToCloudinary(file);
      const result = await addBrand({ name, image: image });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateBrand: async (req, res) => {
    try {
      const { id } = req.query;
      const { name } = req.body;
      let image;
      if (req.file) {
        image = req.file.path;
      }
      const result = await updateBrand({ id, name, image });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteBrand: async (req, res) => {
    try {
      const { id } = req.query;
      const result = await deleteBrand(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllBrands: async (req, res) => {
    try {
      const result = await getAllBrands();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Model Controllers
  addModel: async (req, res) => {
    try {
      const { name, brandId } = req.body;
      // image = req.file.path;
      let image;
      if (req.file) {
        image = req.file.path;
      }
      const result = await addModel({ name, image, brandId });
      res.status(201).json(result);
    } catch (err) {
      console.log("some error : ", err);
      res.status(500).json({ error: err.message });
    }
  },

  updateModel: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, brandId } = req.body;
      let image;
      if (req.file) {
        image = req.file.path;
      }
      const result = await updateModel({ id, name, image, brandId });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteModel: async (req, res) => {
    try {
      const { id } = req.query;
      const result = await deleteModel(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getModels: async (req, res) => {
    try {
      const { brandId } = req.query;
      const result = await getModels({ brandId });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Car Controllers
  addCar: async (req, res) => {
    try {
      const { name, year, status, modelId } = req.body;
      let image;
      if (req.file) {
        image = req.file.path;
      }
      const result = await addCar({
        name,
        image,
        year,
        status,

        modelId,
      });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateCar: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, year, status, brandId, modelId } = req.body;
      let image;
      if (req.file) {
        image = req.file.path;
      }
      const result = await updateCar({
        id,
        name,
        image,
        year,
        status,
        brandId,
        modelId,
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteCar: async (req, res) => {
    try {
      const { id } = req.query;
      const result = await deleteCar(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getCars: async (req, res) => {
    try {
      const { brandId, modelId } = req.query;
      const result = await getCars({ brandId, modelId });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
