import Connection from "../db/connect.js"
import { accountString } from "../constance/entityName.js"

const checkPermission = async (req, res, next) => {
  // Find permission of account
  const permissionOfAccount = await Connection.getInstance().getRepository(accountString).findOne({
    relations: {
      account_permissionsRelation: true
    },
    where: {
      idAccount: req.idAccount
    }
  })
  req.permissions = permissionOfAccount.account_permissionsRelation.map((permission) => {
    return permission.idPermission
  })
  next()
}

export default checkPermission