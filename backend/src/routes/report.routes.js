/**
 Reporting Routes:TODO:
GET /reports/workouts - Get a report of the current user's past workouts, including the percentage of completed workouts during a specified period
 */

import express from 'express';

const router = express.Router();

router.route('workouts').get(getAllWorkoutsReport);
export default router;
