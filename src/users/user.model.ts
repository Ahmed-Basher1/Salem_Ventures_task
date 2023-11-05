import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  // Call this method to hash the password before saving the user
  // hashPassword() {
  //   const salt = bcrypt.genSaltSync(10);
  //   this.password = bcrypt.hashSync(this.password, salt);
  // }

  // Call this method to compare a password with the user's hashed password
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Ensure the password is hashed before saving the user document
UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);

  next();
});

// Add comparePassword method to the user document
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export type UserDocument = HydratedDocument<User>;
