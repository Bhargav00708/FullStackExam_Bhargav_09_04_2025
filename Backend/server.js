const app = require("./app");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const connectMongo = require("./config/mongo");
const User = require("./models/sql/User");
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

(async () => {
  await sequelize.sync(); // Creates tables
  await connectMongo(); // Connect to Mongo
})();
