const { Car, Model, Brand } = require("../model/cars");
//  this is for brands
async function addBrand({ name, image }) {
  const result = await Brand.create({ brandName: name, image: image });
  return result;
}

async function updateBrand({ id, name, image }) {
  const result = await Brand.findByIdAndUpdate(
    id,
    {
      brandName: name,
      image: image,
    },
    { new: true }
  );
  return result;
}

async function deleteBrand(id) {
  const result = await Brand.findByIdAndDelete(id);
  return result;
}
async function getAllBrands() {
  const result = await Brand.find();
  return result;
}
// below is for model
async function addModel({ name, image, brandId }) {
  const result = await Model.create({
    modelName: name,
    image: image,
    parentBrand: brandId,
  });
  return result;
}

async function updateModel({ name, image, brandId, id }) {
  const result = await Model.findByIdAndUpdate(
    id,
    {
      modelName: name,
      image: image,
      parentBrand: brandId,
    },
    { new: true }
  );
  return result;
}
async function deleteModel(id) {
  const result = await Model.findByIdAndDelete(id);
  return result;
}

async function getModels({ brandId }) {
  const result = await Model.find({ parentBrand: brandId }).populate(
    "parentBrand"
  );
  return result;
}

// below is for cars

// Add a car
async function addCar({ name, image, year, status, modelId }) {
  const result = await Car.create({
    carName: name,
    image: image,
    year: year,
    status: status,

    parentModel: modelId,
  });
  return result;
}

// Update a car
async function updateCar({ id, name, image, year, status, brandId, modelId }) {
  const result = await Car.findByIdAndUpdate(
    id,
    {
      carName: name,
      image: image,
      year: year,
      status: status,
      parentBrand: brandId,
      parentModel: modelId,
    },
    { new: true } // return updated document
  );
  return result;
}

// Delete a car
async function deleteCar(id) {
  const result = await Car.findByIdAndDelete(id);
  return result;
}

// Get all cars (optionally filter by brand / model)
async function getCars({ brandId, modelId } = {}) {
  const query = {};
  if (brandId) query.parentBrand = brandId;
  if (modelId) query.parentModel = modelId;

  const result = await Car.find(query)
    .populate("parentBrand")
    .populate("parentModel");
  return result;
}

module.exports = {
  // Brand CRUD
  addBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,

  // Model CRUD
  addModel,
  updateModel,
  deleteModel,
  getModels,

  // Car CRUD
  addCar,
  updateCar,
  deleteCar,
  getCars,
};
