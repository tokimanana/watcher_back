import { UserController } from "@presentation/controllers";
import { authenticationMiddleware } from "@presentation/middleware/authenticationMiddleware";
import { authorizeRoles } from "@presentation/middleware/authorizationMiddleware";
import { container, TYPE } from "@shared/di";
import { Router } from "express";

export const routerUser: Router = Router();


const userContainer = container.get<UserController>(TYPE.UserController);

routerUser.post('/', async (req, res) => {
    await userContainer.createUser(req, res);
});

routerUser.get('/', async (req, res) => {
    await userContainer.getAllUsers(req, res);
});

routerUser.get('/:id', async (req, res) => {
    await userContainer.getUserById(req, res);
});

routerUser.put('/:id', async (req, res) => {
    await userContainer.updateUser(req, res);
});

routerUser.delete('/:id', async (req, res) => {
    await userContainer.deleteUser(req, res);
});

routerUser.post('/authenticate', async (req, res) => {
    let response = await userContainer.authenticateUser(req, res);
});

routerUser.post('/refresh-token', async (req, res) => {
    await userContainer.refreshUserToken(req, res);
});

routerUser.post('/revoke-tokens', authenticationMiddleware, async (req, res) => {
    await userContainer.revokeTokens(req, res);
});