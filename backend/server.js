const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Linus application." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      try {
        await new Role({ name: "user" }).save();
        console.log("added 'user' to roles collection");

        await new Role({ name: "admin" }).save();
        console.log("added 'admin' to roles collection");
      } catch (err) {
        console.log("error", err);
      }
    }
}

console.log(process.env.DB_CONNECTION)
