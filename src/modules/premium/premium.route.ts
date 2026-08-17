import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { auth } from "../../middlewares/auth.js";
import { premiumController } from "./premium.controller.js";
import { subscriptionGuard } from "../../middlewares/premiumGuard.js";
const router = Router()

router.get(
    "/",
    auth(Role.ADMIN, Role.AUTHOR, Role.USER),
    subscriptionGuard(),
    premiumController.getPremiumContent
)

export const premiumRoutes = router