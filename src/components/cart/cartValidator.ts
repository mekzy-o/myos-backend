import * as yup from "yup";

export const addCartValidator = yup
    .object({
        productId: yup.string().required(),
    })
    .noUnknown();
