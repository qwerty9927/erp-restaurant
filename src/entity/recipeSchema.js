import { EntitySchema } from "typeorm";
import { ingredientString, recipeString } from "../constance/entityName.js";

const recipeSchema = new EntitySchema({
  name: recipeString,
  columns: {
    idProduct: {
      type: "int",
      primary: true
    },
    idIngredient: {
      type: "int",
      primary: true
    },
    quantity: {
      type: "double"
    },
    unit: {
      type: "enum",
      enum: ["KG", "CAN"]
    }
  },
  relations: {
    ingredientRelation: {
      type: "many-to-one",
      target: ingredientString,
      joinColumn: {
        name: "idIngredient"
      }
    }
  }
})

export default recipeSchema