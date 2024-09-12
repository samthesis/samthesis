import { Response } from "express";
import db from '../../models';
import commonController from "../common/common.controller";

const Web3 = require("web3");
const jwt = require("jsonwebtoken");
import fs from 'fs';
import path from 'path';
import { Op, QueryTypes } from "sequelize";
const { ethers, utils } = require("ethers");
import * as bcrypt from 'bcrypt';
import coordinates from './cordinates'
// import abi from "../../abi.json"
const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');

const MyQuery = db.sequelize
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_toUserAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_serviceId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_paymentType",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_latitude",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_longitude",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "addServiceRequest",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_service",
				"type": "string"
			}
		],
		"name": "addServices",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_serviceId",
				"type": "uint256"
			}
		],
		"name": "addUserServices",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rating",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timeStamp",
				"type": "uint256"
			}
		],
		"name": "CompletedJobRequest",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "completeJobAndPayByAdmin",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_requestId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rating",
				"type": "uint256"
			}
		],
		"name": "completeRequestAndPay",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "KYCVerified",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_documentHash",
				"type": "string"
			}
		],
		"name": "registerKYC",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userName",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "fromUserAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "toUserAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "serviceId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "paymentType",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "latitude",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "longitude",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ServiceRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "userId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "userName",
				"type": "string"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "serviceName",
				"type": "string"
			}
		],
		"name": "UserServiceEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "verifyKYC",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetAllowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getKYCStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTokenBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "kycRecords",
		"outputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "documentHash",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isVerified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "serviceRequests",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "fromUserAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "toUserAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "serviceId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "paymentType",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "latitude",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "longitude",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isCompleted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "rating",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "services",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userServices",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "serviceId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

require('dotenv').config();

class userCodeController {
	// wallet check
	async addUser(payload: any, res: Response) {
		try {
			const { wallet_address, user_name, email, password, latitude, longitude, active } = payload;

			var user = await db.users.findOne({
				where: { email }
			});

			const hash_password = await commonController.cryptPassword(password)
			console.log(hash_password)
			if (!user) {
				console.log(password, " is not")


				var data = await db.users.create({
					wallet_address,
					user_name,
					email,
					password: hash_password,
					latitude,
					longitude,
					active,
				});
				const token = jwt.sign(
					{
						id: data.id,
					},
					process.env.TOKEN_SECRET
				);

				commonController.successMessage(token, "User created", res);
			} else {
				commonController.errorMessage("User already exists", res);
			}
		} catch (e) {
			console.log(e);
			commonController.errorMessage(`${e}`, res);
		}
	}

	// async checkUser(payload: any, res: Response) {
	// 	try {
	// 		const { wallet_address } = payload
	// 		var user = await db.users.findOne({
	// 			where: { wallet_address }
	// 		})
	// 		if (!user) {
	// 			commonController.errorMessage("user not found", res)
	// 		} else {
	// 			const token = jwt.sign(
	// 				{
	// 					id: user.id,
	// 				},
	// 				process.env.TOKEN_SECRET
	// 			);
	// 			commonController.successMessage(token, "login sucess", res)

	// 		}
	// 	} catch (e) {
	// 		console.log(e)
	// 		commonController.errorMessage(`${e}`, res)
	// 	}
	// }
	async checkUser(payload: any, res: Response) {
		try {
			const { email, password } = payload;

			const user = await db.users.findOne({
				where: { email }
			});

			if (!user) {
				commonController.errorMessage("User not found", res);
			} else {
				const isPasswordValid: any = await commonController.comparePassword(password, user.password);
				console.log(isPasswordValid);
				if (!isPasswordValid) {
					commonController.errorMessage("Invalid password", res);
				} else {
					const token = jwt.sign(
						{ id: user.id },
						process.env.TOKEN_SECRET
					);
					commonController.successMessage(token, "Login successful", res);
				}
			}
		} catch (e) {
			console.log(e);
			commonController.errorMessage(`${e}`, res);
		}
	}

	async userDetails(payload: any, res: Response) {
		try {
			const { userId, pushNotifications, userLanguage } = payload;
			console.log(payload)
			var user = await db.users.findOne({
				where: { id: userId }
			})

			if (user) {
				var name = user.user_name
				var checkData = await db.usersettings.findOne
					({
						where: {
							userId
						}
					})

				if (checkData) {

					var data = await checkData.update({
						pushNotifications: pushNotifications,
					})
					var checklang = await db.userLanguages.findOne
						({
							where: {
								userId
							}
						})
					if (checklang) {
						var data2 = await checklang.update({
							user_Language: userLanguage,
						})
					} else {
						var data2 = await db.userLanguages.create({
							userId: userId,
							user_Language: "English"
						})
					}
					var notification = data.pushNotifications
					var language = data2.user_Language

					commonController.successMessage({ notification, name, language }, "data updated sucessfully", res)

				} else {
					var data = await db.usersettings.create({
						userId: userId,
						pushNotifications: false,

					})

					var checklang = await db.userLanguages.findOne
						({
							where: {
								userId
							}
						})

					if (checklang) {
						var data2 = await checklang.update({
							user_Language: userLanguage,
						})
					} else {
						var data2 = await db.userLanguages.create({
							userId: userId,
							user_Language: "English"
						})
					}
					var notification = data.pushNotifications

					var language = data2.user_Language

					commonController.successMessage({ notification, name, language }, "data updated sucessfully", res)

				}
			} else {
				commonController.errorMessage(`user not found`, res)

			}
		} catch (e) {
			console.log(e)
			commonController.errorMessage(`${e}`, res)
		}
	}

	async addUserServices(payload: any, res: Response) {
		try {
			const { serviceId, userId } = payload
			console.log(payload)

			await db.userservices.destroy({
				where: {
					userId
				}
			})
			const servicesToCreate = serviceId?.map((serviceId: any) => {
				return {
					userId: userId,
					serviceId: serviceId
				};
			});
			await db.userservices.bulkCreate(servicesToCreate);
			var check2 = await db.userservices.findAll({
				where: {
					userId,
					serviceId
				}
			})
			commonController.successMessage(check2, "success", res)
		} catch (e) {
			console.log(e)
			commonController.errorMessage(`${e}`, res)

		}
	}



	async getServices(payload: any, res: Response) {
		try {
			const { userId, longitude, latitude, serviceId } = payload

			console.log(payload, "payload")


			if (serviceId == 0) {
				var query = `
            SELECT b.id,b.wallet_address, c.id as serviceId, c.services, b.user_name, b.latitude, b.longitude, c.image
            FROM userservices a
            JOIN users b ON a.userId = b.id
            JOIN services c ON a.serviceId = c.id
            WHERE 6371 * 2 * ASIN(SQRT(
                POWER(SIN((RADIANS(b.latitude) - RADIANS(:latitude)) / 2), 2) +
                COS(RADIANS(:latitude)) * COS(RADIANS(b.latitude)) *
                POWER(SIN((RADIANS(b.longitude) - RADIANS(:longitude)) / 2), 2)
            )) <= 30; 
          `;
			} else {
				var query = `
                SELECT b.id,b.wallet_address, c.id as serviceId, c.services, b.user_name, b.latitude, b.longitude, c.image
                FROM userservices a
                JOIN users b ON a.userId = b.id
                JOIN services c ON a.serviceId = c.id
                WHERE 6371 * 2 * ASIN(SQRT(
                    POWER(SIN((RADIANS(b.latitude) - RADIANS(:latitude)) / 2), 2) +
                    COS(RADIANS(:latitude)) * COS(RADIANS(b.latitude)) *
                    POWER(SIN((RADIANS(b.longitude) - RADIANS(:longitude)) / 2), 2)
                )) <= 30 and c.id = ${serviceId}
              `;
			}
			const data = await MyQuery.query(query, {
				type: QueryTypes.SELECT,
				replacements: {
					latitude,
					longitude,
				},
			});

			console.log(data);


			const transformedData = data.reduce((result: { id: any; name: any; latitude: any; longitude: any; wallet_address: any; serviceId: any; services: { id: any; serviceId: any; name: any; services: any; latitude: any; longitude: any; image: any; }[]; }[], item: {
				wallet_address: any; user_name: any; id: any; serviceId: any; services: any; latitude: any; longitude: any; image: any;
			}) => {
				const foundIndex = result.findIndex((user: { name: any; }) => user.name === item.user_name);
				console.log(item.id, "foundIndex")
				if (foundIndex === -1) {
					result.push({
						id: item.id,

						name: item.user_name,
						latitude: item.latitude,
						longitude: item.longitude,
						wallet_address: (item.wallet_address)?.replace(/^(.{4})(.*)(.{4})$/, "$1****$3"),
						serviceId: item.serviceId,

						services: [
							{
								id: item.id,
								serviceId: item.serviceId,
								name: item.user_name,
								services: item.services,
								latitude: item.latitude,
								longitude: item.longitude,
								image: item.image
							}
						]
					});
				} else {
					result[foundIndex].services.push({
						id: item.id,
						serviceId: item.serviceId,
						name: item.user_name,
						services: item.services,
						latitude: item.latitude,
						longitude: item.longitude,
						image: item.image
					});
				}

				return result;
			}, []);

			console.log(transformedData);

			commonController.successMessage(transformedData, " successful", res)
		} catch (e) {
			commonController.errorMessage(`${e}`, res)
			console.log(e)
		}
	}


	async getServiceProviders(payload: any, res: Response) {
		try {
			const { serviceId } = payload;
			console.log(serviceId)
			if (!serviceId) {
				return commonController.errorMessage("Service ID is required", res);
			}



			const coordinatesFilePath = path.join(__dirname, '.cordinates.json');
			console.log(coordinatesFilePath)

			// const coordinatesData = JSON.parse(location as any);

			// Select a random coordinate
			const randomCoordinate = coordinates[Math.floor(Math.random() * coordinates.length)].coordinates;
			// Query to get all providers for a specific service
			console.log(randomCoordinate);
			const query = `
				SELECT b.id, b.wallet_address, b.user_name AS name, c.id AS serviceId, c.services, c.image
				FROM userservices a
				JOIN users b ON a.userId = b.id
				JOIN services c ON a.serviceId = c.id
				WHERE c.id = :serviceId;
			`;

			// Execute the query
			const data = await MyQuery.query(query, {
				type: QueryTypes.SELECT,
				replacements: { serviceId }
			});


			const numProviders = data.length;
			const coordinatesCount = coordinates.length;

			// Distribute coordinates to providers
			const assignedData = data.map((item, index) => {
				const coordIndex = index % coordinatesCount;
				const coord = coordinates[coordIndex].coordinates;

				return {
					...item,
					latitude: coord.latitude,
					longitude: coord.longitude
				};
			});
			console.log('Raw Data:', data);

			const transformedData = assignedData.reduce((result: any[], item: any) => {
				const foundUserIndex = result.findIndex(user => user.id === item.id);

				if (foundUserIndex === -1) {
					result.push({
						id: item.id,
						name: item.name,
						serviceId: item.serviceId,
						latitude: item.latitude,
						longitude: item.longitude,

						services: [{
							id: item.id,
							serviceId: item.serviceId,
							name: item.name,
							services: item.services,
							image: item.image
						}]
					});
				} else {
					result[foundUserIndex].services.push({
						id: item.id,
						serviceId: item.serviceId,
						name: item.name,
						services: item.services,
						image: item.image
					});
				}

				return result;
			}, []);

			console.log('Transformed Data:', transformedData);

			// Send success response with the transformed data
			commonController.successMessage(transformedData, "Success", res);
		} catch (e) {
			// Handle errors and send error response
			commonController.errorMessage(`Error: ${e}`, res);
			console.log(e);
		}
	}


	async getMyServices(payload: any, res: Response) {
		try {
			const { userId } = payload
			var data = await MyQuery.query(`SELECT 
            s.id ,
            s.services,s.image,
            CASE WHEN us.serviceId IS NOT NULL THEN true ELSE false END AS selected
        FROM
            services s
        LEFT JOIN
            userservices us ON s.id = us.serviceId AND us.userId = ${userId}`, { type: QueryTypes.SELECT })
			let data1
			if (data.length === 0) {
				data = [
					{
						id: 1,
						service: 'Drive by car',
						image: require('../../servicephotos/drive'),
						selected: false
					},
					{
						id: 2,
						service: 'Go for walk',
						image: require('../../servicephotos/walk.png'),
						selected: false

					},
					{
						id: 3,
						service: 'Clean the garden',
						image: require('../../servicephotos/garden.png'),
						selected: false

					},
					{
						id: 4,
						service: 'IT support',
						image: require('../../servicephotos/walk.png'),
						selected: false

					},
				]
			}

			// console.log(data1,"jk-----")
			commonController.successMessage(data, "success", res)
		} catch (e) {
			console.log(e)
			commonController.errorMessage(`${e}`, res)
		}
	}

	async requestService(payload: any, res: Response) {
		try {

			const { userId, toUserId, amount, paymentType, longitude, latitude, duration, date, serviceId } = payload

			var create = await db.requestservices.create(
				{ fromUserId: userId, toUserId, amount, paymentType, longitude, latitude, duration, date, serviceId })
			commonController.successMessage(create, "Successfully created", res)
			console.log(create)
		} catch (e) {
			console.log(e)
			commonController.errorMessage(`${e}`, res)

		}
	}

	async getMyselectedServices(payload: any, res: Response) {
		try {

			const { userId } = payload

			var data = await MyQuery.query(`select r.date,r.status,r.rating,(select user_name from users where id = r.toUserId) as user_name, 
            (select services from services where id = r.serviceId) as service, 
            (select image from services where id = r.serviceId) as image from requestservices r where r.fromUserId = ${userId}`, { type: QueryTypes.SELECT })
			console.log(data, " gsedg")
			commonController.successMessage(data, "Successfully created", res)
		} catch (e) {
			console.log(e)
			commonController.errorMessage(`${e}`, res)

		}
	}

	async getMyRequestedServices(payload: any, res: Response) {
		try {

			const { userId } = payload

			var data = await MyQuery.query(`select (select user_name from users where id = u.fromUserId) as from_user_name, 
            (select user_name from users where id = u.toUserId) as to_user_name, 
            (select services from services where id = u.serviceId) as service_name,
            (select image from services where id = u.serviceId) as image,
            u.amount, 
            u.longitude, u.latitude, u.paymentType,u.duration,u.date,u.id,
            case when u.status is null then 0 else u.status end as status,

                CASE
        WHEN u.serviceId IN (SELECT serviceId FROM requestservices WHERE id = u.id AND status IS NULL) THEN '#F5F5F5'
        WHEN u.serviceId IN (SELECT serviceId FROM requestservices WHERE id = u.id AND status = 1) THEN '#B9F7C3'
        ELSE '#FFDCB3'
    END AS bgcolor
    from requestservices u where u.fromUserId = ${userId}`, { type: QueryTypes.SELECT })
			console.log(data);
			commonController.successMessage(data, "Successfully created", res)
		} catch (e) {
			console.log(e)
			commonController.errorMessage(`${e}`, res)

		}
	}

	async getMyGivenServices(payload: any, res: Response) {
		try {

			const { userId } = payload;

			var data = await MyQuery.query(`        select (select user_name from users where id = u.fromUserId) as from_user_name, 
            (select user_name from users where id = u.toUserId) as to_user_name, 
            (select services from services where id = u.serviceId) as service_name,
            (select image from services where id = u.serviceId) as image,
            u.amount, 
            u.longitude, u.latitude, u.paymentType,u.duration,u.date,u.id,
            case when u.status is null then 0 else u.status end as status,
                CASE
        WHEN u.serviceId IN (SELECT serviceId FROM requestservices WHERE id = u.id AND status IS NULL) THEN '#F5F5F5'
        WHEN u.serviceId IN (SELECT serviceId FROM requestservices WHERE id = u.id AND status = 1) THEN '#B9F7C3'
        ELSE '#FFDCB3'
    END AS bgcolor
    from requestservices u where u.toUserId = ${userId}`, { type: QueryTypes.SELECT });
			commonController.successMessage(data, "Successfully created", res);
		} catch (e) {

			console.log(e);
			commonController.errorMessage(`${e}`, res);

		}
	}

	async updateServiceStatusAndRating(payload: any, res: Response) {
		try {

			const { userId, id, rating } = payload;
			console.log(payload);

			const find = await db.requestservices.findOne({
				where: {
					id: id,
				}
			})
			if (find.status == 1) {

				commonController.successMessage(find, "Successfully updated", res);
			} else {

				var update = await find.update({
					status: 1,
					rating
				});
				const finds = await db.requestservices.findOne({
					where: {
						id: id,
					}
				})

				const findUser = await db.users.findOne({
					where: {
						id: find.toUserId,
					}
				})

				const wallet = new ethers.Wallet(process.env.PKEY, provider);
				var contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet)
				var tx = await contract.completeJobAndPayByAdmin(`${findUser.wallet_address}`, utils.parseEther(`${find.amount}`), {
					gasLimit: "800000"
				})
				var result = await tx.wait()

				console.log(result.transactionHash)

				var add = await db.usertransactions.create({
					wallet_address: findUser.wallet_address,
					user_name: findUser.user_name,
					hash: result.transactionHash,
					to_user_id: find.toUserId,
					from_user_id: find.fromUserId,
					amount: find.amount
				})

				commonController.successMessage(finds, "Successfully updatedsdefs", res);

			}

		} catch (e) {
			console.log(e);
			commonController.errorMessage(`${e}`, res);

		}
	}

	async getName(payload: any, res: Response) {
		try {
			const { userId } = payload;
			const find = await db.users.findOne({
				where: {
					id: userId,
				}
			});
			if (find) {
				commonController.successMessage(find.user_name, "Successfully", res);
			}
		} catch (e) {
			console.log(e);
			commonController.errorMessage(`${e}`, res);

		}
	}
	async receivedRequest(payload: any, res: Response) {
		try {

			const { userId, id } = payload;
			console.log(payload, "payload");
			const requests = await db.requestservices.findAll({
				where: {
					toUserId: {
						[Op.eq]: id,
					},
				},
			});
			if (requests) {
				commonController.successMessage(requests, "Successfully fetched", res);
			}
		} catch (e) {
			console.log(e);
			commonController.errorMessage(`${e}`, res);

		}
	}
	async acceptStatus(payload: any, res: Response) {
		try {

			const { userId, id } = payload;
			console.log(payload, "payload");
			const find = await db.requestservices.findOne({
				where: {
					id,
				}
			});
			if (find) {
				var update = await find.update({
					status: 2
				})

				commonController.successMessage(update, "Successfully fetched", res);
			}
		} catch (e) {
			console.log(e);
			commonController.errorMessage(`${e}`, res);

		}
	}

	async markedComplete(payload: any, res: Response) {
		try {

			const { userId, id } = payload;
			console.log(payload, "payload");
			const find = await db.requestservices.findOne({
				where: {
					id,
				}
			});
			if (find) {
				var update = await find.update({
					status: 1
				})

				commonController.successMessage(update, "Successfully Updated", res);
			}
		} catch (e) {
			console.log(e);
			commonController.errorMessage(`${e}`, res);

		}
	}



}
export default new userCodeController() 