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
      inverseSide: "warehouseRelation"
    }
  }
})

export default warehouseSchema