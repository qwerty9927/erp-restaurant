import Connection from "../db/connect.js";
import { accountString } from "../constance/entityName.js";

const findAccountByUsername = async ({ username, option = { isLocked: 0 } }) => await Connection.getInstance().getRepository(accountString).findOneBy({
  username,
  ...option
})

const findAccountById = async ({ idAccount, option = { isLocked: 0 } }) => await Connection.getInstance().getRepository(accountString).findOneBy({
  idAccount,
  ...option
})

const updateById = async ({ idAccount, dataSet }) => await Connection.getInstance().getRepository(accountString).update({
  idAccount
}, dataSet)

export {
  findAccountByUsername,
  findAccountById,
  updateById
}