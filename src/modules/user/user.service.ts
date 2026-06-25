import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";


const registerUserIntoDB = async (payload : RegisterUserPayload)=>{
      const {name , email, password, profilePhoto} = payload;

 const isUserExist = await prisma.user.findUnique({
            where : {email}

      })
      if(isUserExist){
            throw new Error("user with this email already exists");
      }
      const hashedPassword = await bcrypt.hash(password,Number(config.bcrypt_salt_rounds))
    
      const createUser = await prisma.user.create({
            data : {
                  name,
                  email,
                  password : hashedPassword,
                  profile : {
                        create: {
                              profilePhoto
                        }
                  }
            }

      })

      // await prisma.profile.create({
      //       data : {
      //             userId : createUser.id,
      //             profilePhoto
      //       }

      // })


      const user = await prisma.user.findUnique({
            where : {
                  id : createUser.id,
                  email : createUser.email || email
            },
            omit : {
                  password : true
                  

            },
            include : {
                  profile : true
            }
      })
      return user
}

export const userService = {
    registerUserIntoDB
}