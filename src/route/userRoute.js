import express from 'express';
import * as health from '../controller/conhealthz.js';
import * as user from '../controller/conUser.js';
const user_router = express.Router();

// Fetching heath data
user_router
    .get("/healthz", health.getHealth);

user_router
    .post("/v1/account", user.addUser);

user_router
    .put("/v1/account/:id", user.updateUser);
    
user_router
    .get("/v1/account/:id", user.getUser);

//define all routes here!
export default user_router;