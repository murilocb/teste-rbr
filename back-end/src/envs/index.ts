import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT as string,
  MONGODB_URI: process.env.MONGODB_URI as string,
};
