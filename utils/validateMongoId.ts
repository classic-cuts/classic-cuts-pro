import mongoose from "mongoose";
export const validateMongoId = (id: string) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  return isValid;
};
