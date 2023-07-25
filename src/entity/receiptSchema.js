import { EntitySchema } from "typeorm";
import { ingredientString, receiptString, receiptdetailString, warehouseString } from "../constance/entityName.js";

const receiptSchema = new EntitySchema({
  name: receiptString,
  columns: {
    idReceipt: {
      type: "int",
      generated: true,
      primary: true
    },
    receiptType: {
      type: "enum",
      enum: ["food", "tools"]
    },
    total: {
      type: "double"
    },
    idSupplier: {
      type: "int"
    },
    idStaff: {
      type: "int"
    },
    createdAt: {
      type: "timestamp"
    },
    note: {
      type: "varchar"
    }
  },
  relations: {
    receiptDetailRelation: {
      target: receiptdetailString,
      type: "one-to-many",
      inverseSide: "receiptRelation"
    },
    warehouseRelation: {
      target: warehouseString,
      type: "one-to-many",
      inverseSide: "receiptRelation"
    },
    ingredientRelation: {
      target: ingredientString,
      type: "one-to-many",
      inverseSide: "receiptRelation"
    }
  }
})

export default receiptSchema