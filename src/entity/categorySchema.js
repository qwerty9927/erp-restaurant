import { EntitySchema } from "typeorm";
import { productString, categoryString } from "../constance/entityName.js";

const categorySchema = new EntitySchema({
  name: categoryString,
  columns: {
    idCategory: {
      type: "int",
      generated: true,
      primary: true
    },
    categoryName: {
      type: "varchar"
    },
    image: {
      type: "varchar"
    }
  },
  relations: {
    productRelation: {
      target: productString,
      type: "one-to-many",
      inverseSide: "categoryRelation"
    }
  }
})

export default categorySchema