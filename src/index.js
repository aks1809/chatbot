import "./config/database.js";
import express from "express";
import bodyParser from "body-parser";
import ApiRoutes from "./routes/routes.js";
import constants from "./config/constants.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", ApiRoutes);

app.listen(constants.PORT, (err) => {
  if (err) {
    console.log("Cannot run!");
  } else {
    console.log(`API server listening on port: ${constants.PORT}`);
  }
});

export default app;
