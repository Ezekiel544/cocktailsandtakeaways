import mongoose, { Schema, Document, Model } from "mongoose"

export interface ISignup extends Document {
  firstName: string
  email: string
  createdAt: Date
}

const SignupSchema = new Schema<ISignup>(
  {
    firstName: { type: String, required: true, trim: true },
    email:     { type: String, required: true, trim: true, lowercase: true, unique: true },
  },
  { timestamps: true }
)

const Signup: Model<ISignup> =
  mongoose.models.Signup ?? mongoose.model<ISignup>("Signup", SignupSchema)

export default Signup