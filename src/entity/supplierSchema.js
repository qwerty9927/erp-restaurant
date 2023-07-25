import { EntitySchema } from "typeorm";
import { supplierString } from "../constance/entityName.js";

const supplierSchema = new EntitySchema({
  name: supplierString,
  columns: {
    idSupplier: {
      type: "int",
      primary: true,
      generated: true
    },
    supplierName: {
      type: "varchar"
    },
    phoneNumber: {
      type: "int"
    },
    address: {
      type: "varchar"
    },
    email: {
      type: "varchar"
    },
    supplyGoods: {
      type: "varchar"
    },
    isDelete: {
      type: "tinyint"
    }
  }
})

export default supplierSchema