import { EntitySchema } from "typeorm";
import { accountString, apString } from "../constance/entityName.js";

const accountSchema = new EntitySchema({
  name: accountString,
  columns: {
    idAccount: {
      type: "int",
      primary: true,
      generated: true
    },
    username: {
      type: "varchar",
      length: 255
    },
    password: {
      type: "varchar",
      length: 255
    },
    accessKey: {
      type: "varchar",
      length: 255
    },
    refreshKey: {
      type: "varchar",
      length: 255
    }
  }, 
  relations: {
    account_permissionsRelation: {
      target: apString,
      type: "one-to-many",
      inverseSide: "accountRelation"
    }
  }
})

export default accountSchema