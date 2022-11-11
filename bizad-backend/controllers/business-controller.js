const { Business } = require("../models/businesses-model");

async function getAllBusinesses(req, res) {
  const businesses = await Business.find();
  res.json(businesses);
}
async function editServices(req, res) {
  const { businessId } = req.params;
  const serviceChange = req.body;
  const business = Business.findById(businessId);
  res.json({});
}

// Business.create({
//   name: "some name",
//   description: "some description",
//   address: "some addrs",
//   phone: "phone",
//   adNum: 234324,
//   imgUrl:
//     "https://images.unsplash.com/photo-1667132713857-6c3369c06f7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//   websiteUrl: "https://images.unsplash.com",
// });

module.exports = { getAllBusinesses, getAllBusinesses };
