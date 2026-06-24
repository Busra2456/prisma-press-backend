import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";

const registerUser = async (req:Request,res :Response)=>{
      try {
            const payload = req.body;
      const user = await userService.registerUserIntoDB(payload)
      
    
      res.status(httpStatus.CREATED).json({
            success : true,
            statuscode : httpStatus.CREATED,
            message : "user registered successfully",
            data : {
                  user
            }
      })
      } catch (error) {
             console.log(error);

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to register user",
            error: (error as Error).message
        })
            
      }
      // const payload = req.body;
      // const user = await userService.registerUserIntoDB(payload)
      
    
      // res.status(httpStatus.CREATED).json({
      //       success : true,
      //       statuscode : httpStatus.CREATED,
      //       message : "user registered successfully",
      //       data : {
      //             user
      //       }
      // })
}
export const userController = {
      registerUser
}