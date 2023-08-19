import { EntitySchema } from "typeorm";
import { productString } from "../constance/entityName.js";

const productSchema = new EntitySchema({
  name: productString,
  columns: {
    idProduct: {
      primary: true,
      type: "int",
      generated: true
    }, 
    productName: {
      type: "varchar"
    },
    slug: {
      type: "varchar"
    },
    image: {
      type: "varchar"
    },
    productType: {
      type: "enum",
      enum: ["food", "drink"]
    },
    isDirect: {
      type: "tinyint"
    },
    isPublish: {
      type: "tinyint"
    },
    isDraft: {
      type: "tinyint"
    },
    idCategory: {
      type: "int"
    }
  }
})

export default productSchema