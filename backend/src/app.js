import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { globalErrorHandler } from '../src/middlewares/globalError.middleware.js';
import userRouter from '../src/routes/user.routes.js';
import exerciseRouter from '../src/routes/exercise.routes.js';
import reportRouter from '../src/routes/report.routes.js';
import workoutRouter from '../src/routes/workout.routes.js';
import workoutCommentRouter from '../src/routes/workout-comment.routes.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// user routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/exercises', exerciseRouter);
app.use('/api/v1/report', reportRouter);
app.use('/api/v1/workouts', workoutRouter);
app.use('/api/v1/comments', workoutCommentRouter);

app.use(globalErrorHandler);
