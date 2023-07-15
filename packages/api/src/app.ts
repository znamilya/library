import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { v1Router } from "./v1Router";

const app = express();
const PORT = process.env.PORT || 1235;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
