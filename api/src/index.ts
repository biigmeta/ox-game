import "module-alias/register";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import dataCasingMiddleware from "./middlewares/data-casing.middleware";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
import routes from "./routes";

dotenv.config();
const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser()); // Middleware to parse cookies
app.disable("x-powered-by"); // Disable the X-Powered-By header

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "production" ? 100 : 1000, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());
app.use("/api", dataCasingMiddleware, routes);

// Error Handler (must be last)
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
