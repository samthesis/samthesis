import { Request, Response } from 'express';

import db from '../models';
import commonController from "./common/common.controller";
import userCodeController from "./service/user.code.controller";



class userController {

/**
 * @swagger
 * /auth/register:
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

    async addUser(req: Request, res: Response) {
        try {
            const { wallet_address, user_name
                , email
                , password
                , latitude
                , longitude
                , active } = req.body

            await userCodeController.addUser({
                wallet_address, user_name
                , email
                , password 
                , latitude
                , longitude
                , active
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }
/**
 * @swagger
 * /auth/sigin:
 *   post:
 *     summary: Check user credentials
 *     description: Validates user credentials and returns user information
 *     tags: [User]
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
    async checkUser(req: Request, res: Response) {
        try {
            const { wallet_address, email, password } = req.body
            await userCodeController.checkUser({
                wallet_address,
                email,               
                password
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

        /**
 * @swagger
 * /member/userdetails:
 *   post:
 *     summary: Get user details
 *     description: Retrieves and updates user details
 *     tags: [User] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pushNotifications:
 *                 type: boolean
 *                 description: User's preference for push notifications
 *               userLanguage:
 *                 type: string
 *                 description: User's preferred language
 *     responses:
 *       200:
 *         description: User details retrieved and updated successfully
 *       400:
 *         description: Bad request
 */
    async userDetails(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            const { pushNotifications, userLanguage } = req.body
            await userCodeController.userDetails({
                userId, pushNotifications, userLanguage
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

/**
 * @swagger
 * /member/adduserservices:
 *   post:
 *     summary: Add services for the user
 *     description: Adds a service to the user's account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceId:
 *                 type: string
 *                 description: The ID of the service to be added
 *     responses:
 *       200:
 *         description: Service added successfully
 *       400:
 *         description: Bad request
 */
    async addUserServices(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            const { serviceId } = req.body
            await userCodeController.addUserServices({
                userId, serviceId
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

/**
 * @swagger
 * /member/getservices:
 *   post:
 *     summary: Get available services
 *     description: Retrieves a list of available services based on the user's location and service ID
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longitude:
 *                 type: number
 *                 description: The longitude of the user's location
 *               latitude:
 *                 type: number
 *                 description: The latitude of the user's location
 *               serviceId:
 *                 type: string
 *                 description: The ID of the service to filter by
 *     responses:
 *       200:
 *         description: List of services retrieved successfully
 *       400:
 *         description: Bad request
 */
    async getServices(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            const { longitude, latitude, serviceId } = req.body
            await userCodeController.getServices({
                userId, longitude, latitude, serviceId
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }


        /**
 * @swagger
 * /member/getserviceproviders:
 *   post:
 *     summary: Get available services
 *     description: Retrieves a list of available services based on the user's location and service ID
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longitude:
 *                 type: number
 *                 description: The longitude of the user's location
 *               latitude:
 *                 type: number
 *                 description: The latitude of the user's location
 *               serviceId:
 *                 type: string
 *                 description: The ID of the service to filter by
 *     responses:
 *       200:
 *         description: List of services retrieved successfully
 *       400:
 *         description: Bad request
 */
    }
    async getServiceProviders(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            const { longitude, latitude, serviceId } = req.body
            await userCodeController.getServiceProviders({
                userId, longitude, latitude, serviceId
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

/**
 * @swagger
 * /member/getmyservices:
 *   post:
 *     summary: Get services for the user
 *     description: Retrieves a list of services associated with the user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user whose services are being retrieved
 *     responses:
 *       200:
 *         description: List of user's services retrieved successfully
 *       400:
 *         description: Bad request
 */
    async getMyServices(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            // const { logitude, latitude } = req.body
            await userCodeController.getMyServices({
                userId
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

    /**
 * @swagger
 * /member/requestservice:
 *   post:
 *     summary: Request a service
 *     description: Allows a user to request a service from another user, including details such as amount, payment type, and service specifics.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toUserId:
 *                 type: string
 *                 description: The ID of the user providing the service
 *               amount:
 *                 type: number
 *                 description: The amount to be paid for the service
 *               paymentType:
 *                 type: string
 *                 description: The type of payment (e.g., 'credit_card', 'paypal')
 *               longitude:
 *                 type: number
 *                 description: The longitude of the service location
 *               latitude:
 *                 type: number
 *                 description: The latitude of the service location
 *               duration:
 *                 type: string
 *                 description: The duration for which the service is requested
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date on which the service is requested
 *               serviceId:
 *                 type: string
 *                 description: The ID of the requested service
 *     responses:
 *       200:
 *         description: Service request submitted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
    async requestService(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            
            const { toUserId, amount, paymentType, longitude, latitude, duration, date, serviceId } = req.body
            await userCodeController.requestService({
                userId, toUserId, amount, paymentType, longitude, latitude, duration, date, serviceId
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }
/**
 * @swagger
 * /member/getmyselectedservices:
 *   post:
 *     summary: Get services requested by the user
 *     description: Retrieves a list of services that have been requested by the user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user whose requested services are being retrieved
 *     responses:
 *       200:
 *         description: List of requested services retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
    async getMyselectedServices(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id

            await userCodeController.getMyselectedServices({
                userId
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

/**
 * @swagger
 * /member/getmyrequestedservices:
 *   post:
 *     summary: Get services requested by the user
 *     description: Retrieves a list of services that have been requested by the user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user whose requested services are being retrieved
 *     responses:
 *       200:
 *         description: List of requested services retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
    async getMyRequestedServices(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id

            await userCodeController.getMyRequestedServices({
                userId
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

/**
 * @swagger
 * /member/getmyprovidedservices:
 *   post:
 *     summary: Get services requested by the user
 *     description: Retrieves a list of services that have been given by the you.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user whose requested services are being retrieved
 *     responses:
 *       200:
 *         description: List of requested services retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
    async getMyGivenServices(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id

            await userCodeController.getMyGivenServices({
                userId
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

/**
 * @swagger
 * /member/updateservicestatus:
 *   post:
 *     summary: Update service status and rating
 *     description: Updates the status and rating of a specified service.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - rating
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the service to update
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: The new rating for the service (scale of 1 to 5)
 *     responses:
 *       200:
 *         description: Service status and rating updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - Invalid or missing authentication
 *       500:
 *         description: Internal server error
 */
    async updateServiceStatusAndRating(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            const { id, rating } = req.body

            await userCodeController.updateServiceStatusAndRating({
                userId, id, rating
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

/**
 * @swagger
 * /member/getprofile:
 *   post:
 *     summary: Get User Details
 *     description: Get The User Details.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user whose requested services are being retrieved
 *     responses:
 *       200:
 *         description: List of requested services retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
    async getName(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            await userCodeController.getName({
                userId
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }
/**
 * @swagger
 * /member/receivedrequest:
 *   post:
 *     summary: get list of all received requests
 *     description: get all list of recevided requests.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the request to accept
 *     responses:
 *       200:
 *         description: Request status accepted successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - Invalid or missing authentication
 *       500:
 *         description: Internal server error
 */
    async receivedRequest(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            const { id } = req.body
            await userCodeController.receivedRequest({
                userId, id
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

/**
 * @swagger
 * /member/acceptrequest:
 *   post:
 *     summary: Accept a request status
 *     description: Accepts the status of a request with a given ID.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the request to accept
 *     responses:
 *       200:
 *         description: Request status accepted successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - Invalid or missing authentication
 *       500:
 *         description: Internal server error
 */
    async acceptRequestStatus(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            const { id } = req.body
            await userCodeController.acceptStatus({
                userId, id
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }

    /**
 * @swagger
 * /member/markedcomplete:
 *   post:
 *     summary: Accept a request status
 *     description: marked compelte status of a request with a given ID.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the request to accept
 *     responses:
 *       200:
 *         description: Request status accepted successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - Invalid or missing authentication
 *       500:
 *         description: Internal server error
 */

    async markedComplete(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id
            const { id } = req.body
            await userCodeController.markedComplete({
                userId, id
            }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("error in api", res)
        }

    }



}

export default new userController();
