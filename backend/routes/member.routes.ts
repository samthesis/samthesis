import { verify } from 'crypto';
import express from 'express';
import userController from '../controllers/user.controller';

//  import userController from "../controllers/user.controller";

const router = express.Router();


router.post("/userdetails", userController.userDetails);//w
router.post("/adduserservices", userController.addUserServices);//w
router.post("/getmyservices", userController.getMyServices);//w
router.post("/getserviceproviders", userController.getServiceProviders);//w
router.post("/getservices", userController.getServices);//w
router.post("/requestservice", userController.requestService);//w
router.post("/getmyselectedservices", userController.getMyselectedServices);//w
router.post("/getmyrequestedservices", userController.getMyRequestedServices);//w
router.post("/getmyprovidedservices", userController.getMyGivenServices);
router.post("/updateservicestatus", userController.updateServiceStatusAndRating);//w
router.post("/getprofile", userController.getName)//w
router.post("/receivedrequest", userController.receivedRequest)

router.post("/acceptrequest", userController.acceptRequestStatus) // w
router.post("/markedcomplete", userController.markedComplete) // w








export default router;
