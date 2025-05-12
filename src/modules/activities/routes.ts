import { Router } from "express";
import { createActivityController, deleteActivityController, getActivitiesController } from "./controllers";

const router = Router();

router
    .route("/:userId/day/:endDate")
    .get(getActivitiesController)

router
    .route("/")
    .post(createActivityController)

router
    .route("/:userId/:endDate/:activityId")
    .delete(deleteActivityController)

export default router;