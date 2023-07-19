import { EntitySchema } from "typeorm";
import Product from "../models/product.model.js";
import categorySchema from "./categorySchema.js";

const productSchema = new EntitySchema({
  name: "Product",
  target: Product,
  columns: {
    idProduct: {
      primary: true,
      type: "int",
      generated: true
    }, 
    productName: {
      type: "varchar",
      length: 255
    },
    image: {
      type: "varchar",
      length: 255
    },
    productType: {
      type: "enum",
      enum: ["food", "drink"]
    },
    isDirect: {
      type: "tinyint"
    },
    isDelete: {
      type: "tinyint"
    },
    idCategory: {
      type: "int"
    }
  },
  relations: {
    idCategory: {
      target: categorySchema,
      type: "many-to-one",
      eager: true,
      joinColumn: {
        name: "idCategory"
      }
    }
  }
})

export default productSchema