import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const db = process.env.DATABASE_URI.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    )
    const connectionInstance = await mongoose.connect(db)
    console.log(`\n Mongodb connected at host ${connectionInstance.connection.host} 🚀🚀`)
  } catch (error) {
    console.log(`MongoDB connection ERROR::`, error)
    process.exit(1)
  }
}
