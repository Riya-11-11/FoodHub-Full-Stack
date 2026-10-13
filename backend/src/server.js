import app from "./app/app.js";
import { connectToDB } from "./config/db.js";

await connectToDB();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});