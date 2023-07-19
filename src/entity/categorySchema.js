import { EntitySchema } from "typeorm";
import Category from "../models/category.model.js";

const categorySchema = new EntitySchema({
  name: "Category",
  target: Category,
  columns: {
    idCategory: {
      type: "int",
      generated: true,
      primary: true
    },
    categoryName: {
      type: "varchar",
      length: 255
    }
  }
})

export default categorySchema