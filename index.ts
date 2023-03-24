import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { MONGO_URI } from "./config";
import { AdminRoute, VandorRoute } from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", AdminRoute);
app.use("/vandor", VandorRoute);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    //console.log("result", result);
    console.log("DB Connected");
  })
  .catch((err) => console.log("error" + err));

// app.use("/", (req, res) => {
//     return res.json('Hello from Food Order Backend!!');
// });

app.listen(8000, () => {
  console.clear();
  console.log("App is listening to the port 8000");
});
