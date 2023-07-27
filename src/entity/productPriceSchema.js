import { EntitySchema } from "typeorm";
import { productPriceString } from "../constance/entityName.js";

const productPriceSchema = new EntitySchema({
  name: productPriceString,
  columns: {
    idProduct: {
      type: "int",
      primary: true
    },
    productName: {
      type: "varchar"
    },
    price: {
      type: "double"
    },
    cost: {
      type: "double"
    }
  }
})

export default productPriceSchema