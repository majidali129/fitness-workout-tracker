import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { logger } from './logger/logger.js';

import { globalErrorHandler } from '../src/middlewares/globalError.middleware.js';
import userRouter from '../src/routes/user.routes.js';
import exerciseRouter from '../src/routes/exercise.routes.js';
import reportRouter from '../src/routes/report.routes.js';
import workoutRouter from '../src/routes/workout.routes.js';
import workoutCommentRouter from '../src/routes/workout-comment.routes.js';

export const app = express();

const morganFormat = ':method :url :status :response-time ms';

// COMMON MIDDLEWARES
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(express.json());
app.use(cookieParser());

// user routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/exercises', exerciseRouter);
app.use('/api/v1/report', reportRouter);
app.use('/api/v1/workouts', workoutRouter);
app.use('/api/v1/comments', workoutCommentRouter);

app.use(globalErrorHandler);
