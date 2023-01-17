import app from "./app";
import { config } from "dotenv";
config();

export const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Listening: http://localhost:${PORT}`);
});
