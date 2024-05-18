import { Router, Request, Response } from "express";
import employeeRoutes from "./employees";
import cors from "cors";

const router: Router = Router();

router.use(cors());

router.use("/api", employeeRoutes);

router.use("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

export default router;
