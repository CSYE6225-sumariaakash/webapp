import express from 'express';
import * as health from '../controller/conhealthz.js';
const router = express.Router();

//route '/healthz' endpoint to controller
router.get("/healthz", health.getHealth);

export default router;