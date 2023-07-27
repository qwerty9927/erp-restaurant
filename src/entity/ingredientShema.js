import { EntitySchema } from "typeorm";
import { ingredientString, receiptString } from "../constance/entityName.js";

const ingredientSchema = new EntitySchema({
  name: ingredientString,
  columns: {
    idIngredient: {
      type: "int",
      generated: true,
      primary: true
    },
    ingredientName: {
      type: "varchar"
    },
    remainQuantity: {
      type: "int"
    },
    ingredientType: {
      type: "enum",
      enum: ["food", "drink"]
    },
    priceOfOne: {
      type: "double"
    },
    unit: {
      type: "enum",
      enum: ['KG','CAN']
    },
    idReceipt: {
      type: "int"
    }
  }
})

export default ingredientSchema