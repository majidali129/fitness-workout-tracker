User-related Routes:TODO:
POST /users/register - User registration
POST /users/login - User login
GET /users/me - Get the current user's profile
PUT /users/me - Update the current user's profile

Exercise-related Routes:TODO:
GET /exercises - Get the list of all predefined exercises
GET /exercises/:id - Get the details of a specific exercise
POST /exercises - Create a new exercise (for admin users)
PUT /exercises/:id - Update an existing exercise (for admin users)
DELETE /exercises/:id - Delete an exercise (for admin users)

Workout-related Routes: TODO:
POST /workouts - Create a new workout for the current user
GET /workouts - Get all the workouts for the current user, sorted by date
GET /workouts/:id - Get the details of a specific workout
PUT /workouts/:id - Update an existing workout (e.g., mark exercises as completed, add comments)
DELETE /workouts/:id - Delete a workout (for admin users)

Workout Comment-related Routes:TODO:
POST /workouts/:id/comments - Add a new comment to a specific workout
GET /workouts/:id/comments - Get all the comments for a specific workout
PUT /workouts/:id/comments/:commentId - Update an existing workout comment
DELETE /workouts/:id/comments/:commentId - Delete a workout comment

Reporting Routes:TODO:
GET /reports/workouts - Get a report of the current user's past workouts, including the percentage of completed workouts during a specified period