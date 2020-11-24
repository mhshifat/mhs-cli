import express from "express";

const routes = express.Router();
routes.use("/", require("./default").default);

export default routes;
