import { EntitySchema } from "typeorm";
import { receiptString, warehouseString } from "../constance/entityName.js";

const warehouseSchema = new EntitySchema({
  name: warehouseString,
  columns: {
    idWareHouse: {
      type: "int",
      generated: true,
      primary: true
    },
    wareHouseName: {
      type: "varchar"
    },
    remainQuantity: {
      type: "int"
    },
    priceOfOne: {
      type: "double"
    },
    unit: {
      type: "enum",
      enum: ["UNIT", "LITER"]
    },
    idReceipt: {
      type: "int"
    }
  }
})

export default warehouseSchema