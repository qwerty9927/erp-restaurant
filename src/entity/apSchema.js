import { EntitySchema } from "typeorm";
import { accountString, apString } from "../constance/entityName.js"

const apSchema = new EntitySchema({
  name: apString,
  columns: {
    idAp: {
      type: "int",
      primary: true,
      generated: true
    },
    idPermission: {
      type: "int"
    },
    idAccount: {
      type: "int"
    }
  },
  relations: {
    accountRelation: {
      target: accountString,
      type: "many-to-one",
      joinColumn: {
        name: "idAccount"
      },
      inverseSide: "account_permissionsRelation"
    }
  }
})

export default apSchema