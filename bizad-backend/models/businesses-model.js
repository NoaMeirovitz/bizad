const mongoose = require("mongoose");

const businessesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  adNum: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  services: {
    type: {
      serviceName: String,
      status: Boolean,
    },
  },
});

const Business = mongoose.model("businesses", businessesSchema);
module.exports = { Business };
