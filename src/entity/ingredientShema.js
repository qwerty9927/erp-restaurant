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
    unit: {
      type: "enum",
      enum: ["UNIT"]
    },
    idReceipt: {
      type: "int"
    }
  },
  relations: {
    receiptRelation: {
      target: receiptString,
      type: "many-to-one",
      joinColumn: {
        name: "idReceipt"
      },
      inverseSide: "ingredientRelation"
    }
  }
})

export default ingredientSchema