import { EntitySchema } from "typeorm";
import { receiptString, receiptdetailString } from "../constance/entityName.js";

const receiptDetailSchema = new EntitySchema({
  name: receiptdetailString,
  columns: {
    idReceiptDetail: {
      type: "int",
      primary: true,
      generated: true
    },
    name: {
      type: "varchar"
    }, 
    quantity: {
      type: "int"
    }, 
    quantityOfCrates: {
      type: "smallint"
    }, 
    priceOfOne: {
      type: "double"
    },
    unit: {
      type: "enum",
      enum: ['KG','UNIT','LITER','CRATES']
    },
    idReceipt: {
      type: "int"
    },
    idWareHouse: {
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
      inverseSide: "receiptDetailRelation"
    }
  }
})

export default receiptDetailSchema