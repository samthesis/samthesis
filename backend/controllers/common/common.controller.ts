import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'
// const { SECRET_KEY, MAP_SECRET_KEY } = require('../appconfig');
// sgMail.setApiKey('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')

class commonController {
  


  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  generateReferralCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  // cryptPassword(password:any) {
  //   bcrypt.genSalt(10, function (err:any, salt:any) {
  //     if (err)
  //       return err;


  //     bcrypt.hash(password, salt, function (err:any, hash:any) {
  //       return hash;
  //     });
  //   });
  // };
  async cryptPassword(password: string): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (e) {
      console.log(e)
    }
  }

  async comparePassword(plainPass: string, hashword: string): Promise<any> {
    try {
      const isMatch = await bcrypt.compare(plainPass, hashword);
      return isMatch;
    } catch (e) {
      console.log(e)
    }
  }


  // comparePassword = function (plainPass:any, hashword:any) {
  //   bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
  //     return err == null ?
  //       isPasswordMatch :
  //       err;
  //   });
  // };



  successMessage(data: any, msg: string, res: Response) {
    try {
      return res.status(200).send({
        message: msg,
        data
      });
    } catch (e) {
      console.log(e);
    }
  }
  success(data: any, msg: string, res: Response) {
    try {
      return res.status(201).send({
        message: msg,
        data
      });
    } catch (e) {
      console.log(e);
    }
  }

  successMulti(data: any, data1: any, data2: any, msg: string, res: Response) {
    try {
      return res.status(201).send({
        message: msg,
        data,
        data1,
        data2
      });
    } catch (e) {
      console.log(e);
    }
  }

  errorMessage(msg: string, res: Response) {
    try {
      return res.status(400).send({
        error: {
          message: msg
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  error(msg: string, res: Response) {
    try {
      return res.status(401).send({
        error: {
          message: msg,
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  error410(msg: string, res: Response) {
    try {
      return res.status(410).send({
        error: {
          message: msg,
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  error1(msg: string, res: Response) {
    try {
      return res.status(401).send({
        error: {
          message: msg,

        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  error2(msg: string, res: Response) {
    try {
      return res.status(402).send({
        error: {
          message: msg,

        }
      });
    } catch (e) {
      console.log(e);
    }
  }


  validateUserId = async (id: any) => {
    if (id !== 1 || id !== 2 || id !== 3) {
      return false;
    }
    return true;
  }



}
export default new commonController();