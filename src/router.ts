import { Router } from "express";

import {scrapeFunction } from "./controller";

const router = Router();

router.get('/', scrapeFunction);

export default router;



