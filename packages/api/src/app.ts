import express, { Request } from "express";
import cors from "cors";
import { v1Router } from "./v1Router";

const app = express();
const PORT = process.env.PORT || 1235;

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

app.use("/api", v1Router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
