// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     image: String,
//     slug: { type: String, unique: true },
//   },
//   { timestamps: true }
// );

// const brandSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     image: String,
//     parentCat: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     slug: { type: String, unique: true },
//   },
//   { timestamps: true }
// );

// const modelSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     image: String,
//     parentCat: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     parentBrand: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Brand",
//       required: true,
//     },
//     slug: { type: String, unique: true },
//   },
//   { timestamps: true }
// );

// const carSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     images: [String],
//     year: { type: Number, required: true },
//     parentCat: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     parentBrand: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Brand",
//       required: true,
//     },
//     parentModel: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Model",
//       required: true,
//     },
//     price: { type: Number, required: true },
//     description: String,
// status: {
//   type: String,
//   enum: ["sold", "available", "booked", "upcoming"],
//   default: "available",
// },
//     features: [String], // Specific features of this car
//     mileage: Number,
//     color: String,
//     seoTitle: String,
//     seoDescription: String,
//     seoTags: [String],
//     slug: { type: String, unique: true },
//   },
//   { timestamps: true }
// );

// const Category = mongoose.model("Category", categorySchema);
// const Brand = mongoose.model("Brand", brandSchema);
// const Model = mongoose.model("Model", modelSchema);
// const Car = mongoose.model("Car", carSchema);

// module.exports = {
//   Category,
//   Brand,
//   Model,
//   Car,
// };

const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    brandName: String,
    image: String,
  },
  { timestamps: true }
);

const modelSchema = new mongoose.Schema(
  {
    modelName: String,
    image: String,
    parentBrand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  { timestamps: true }
);

const carSchema = new mongoose.Schema(
  {
    carName: String,
    image: String,
    year: String,
    status: {
      type: String,
      enum: ["sold", "available", "booked", "upcoming"],
      default: "available",
    },
    parentModel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
      required: true,
    },
    parentBrand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
const Model = mongoose.model("Model", modelSchema);
const Car = mongoose.model("Car", carSchema);

module.exports = {
  Brand,
  Model,
  Car,
};
