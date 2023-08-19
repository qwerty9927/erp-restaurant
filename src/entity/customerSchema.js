import { EntitySchema } from "typeorm";
import { customerString } from "../constance/entityName.js";

const customerSchema = new EntitySchema({
  name: customerString,
  columns: {
    idCustomer: {
      type: "int",
      generated: true,
      primary: true
    },
    customerName: {
      type: "varchar"
    },
    phoneNumber: {
      type: "bigint"
    },
    birthday: {
      type: "date"
    },
    sex: {
      type: "varchar"
    },
    address: {
      type: "varchar"
    },
    email: {
      type: "varchar"
    }, 
    isDelete: {
      type: "tinyint"
    },
    idAccount: {
      type: "int"
    }
  }
})

export default customerSchema