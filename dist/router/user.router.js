"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const createUser_controller_1 = require("../controller/User/createUser.controller");
const loginUser_controller_1 = require("../controller/User/loginUser.controller");
const listUsers_controller_1 = require("../controller/User/listUsers.controller");
const getUserById_controller_1 = require("../controller/User/getUserById.controller");
const schema_validation_1 = require("../Schema/schema.validation");
const schemas_1 = require("../Schema/schemas");
const router = (0, express_1.Router)();
const userRouter = () => {
    router.post("/user", (0, schema_validation_1.validate)(schemas_1.userRegisterSchema), createUser_controller_1.userCreate);
    router.post("/login", (0, schema_validation_1.validate)(schemas_1.loginRegisterSchema), loginUser_controller_1.loginUser);
    router.get("/user", authentication_middleware_1.isAuthenticated, authentication_middleware_1.isAdm_middleware, listUsers_controller_1.getUsers);
    router.get("/user/:id", authentication_middleware_1.isAuthenticated, getUserById_controller_1.getUserProfile);
    return router;
};
exports.userRouter = userRouter;