import express, { Application } from "express";
import { config } from "./src/envs";
import routes from "./src/routes";
import { connectMongoDB } from "./src/database/mongodb";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = config.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await connectMongoDB();
});

export { app };
