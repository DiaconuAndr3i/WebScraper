import { Router } from "express";

import {scrapeFunction } from "./controller";

const router = Router();

router.post('/', scrapeFunction);

export default router;



