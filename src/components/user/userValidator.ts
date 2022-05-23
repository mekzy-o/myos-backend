import * as yup from "yup";

export const userValidator = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })
  .noUnknown();
