import express,{ Application, Request, Response } from "express";
import config from "./config";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRoutes } from "./modules/user/user.route";


const app : Application = express();

app.use(cors({
      origin : config.app_url,
      credentials : true
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())

app.get("/", async(req :Request, res : Response) =>{
    
      res.send("Hello world")
});

// app.post("/api/users/register", async (req:Request,res :Response)=>{
//       const {name , email, password, profilePhoto} = req.body;
//       const isUserExist = await prisma.user.findUnique({
//             where : {email}

//       })
//       if(isUserExist){
//             throw new Error("user with this email already exists");
//       }
//       const hashedPassword = await bcrypt.hash(password,Number(config.bcrypt_salt_rounds))
    
//       const createUser = await prisma.user.create({
//             data : {
//                   name,
//                   email,
//                   password : hashedPassword,
//             }

//       })

//       await prisma.profile.create({
//             data : {
//                   userId : createUser.id,
//                   profilePhoto
//             }

//       })

//       const user = await prisma.user.findUnique({
//             where : {
//                   id : createUser.id,
//                   email : createUser.email || email
//             },
//             omit : {
//                   password : true
                  

//             },
//             include : {
//                   profile : true
//             }
//       })

//       res.status(httpStatus.CREATED).json({
//             success : true,
//             statuscode : httpStatus.CREATED,
//             message : "user registered successfully",
//             data : {
//                   user
//             }
//       })
// })
app.use("/api/users", userRoutes)

export default app;