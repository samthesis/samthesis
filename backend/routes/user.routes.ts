import { verify } from 'crypto';
import express from 'express';
import userController from '../controllers/user.controller';

//  import userController from "../controllers/user.controller";


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: user - Authentication
 *   description: Authentication routes
 */


/**
 * @swagger
 * /member/register:
 *   post:
 *     summary: Add a new user
 *     description: Adds a new user to the system
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wallet_address
 *               - user_name
 *               - email
 *               - password
 *             properties:
 *               wallet_address:
 *                 type: string
 *                 description: Wallet address of the user
 *               user_name:
 *                 type: string
 *                 description: Name of the user
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *               latitude:
 *                 type: number
 *                 description: Latitude of the user's location
 *               longitude:
 *                 type: number
 *                 description: Longitude of the user's location
 *               active:
 *                 type: boolean
 *                 description: Whether the user is active
 *     responses:
 *       200:
 *         description: User added successfully
 *       400:
 *         description: Bad request
 */


router.post("/register", userController.addUser)

/**
 * @swagger
 * /auth/sigin:
 *   post:
 *     summary: Check user credentials
 *     description: Validates user credentials and returns user information
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wallet_address
 *               - email
 *               - password
 *             properties:
 *               wallet_address:
 *                 type: string
 *                 description: Wallet address of the user
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: User credentials validated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
router.post("/sigin", userController.checkUser)




export default router;

