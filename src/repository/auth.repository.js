import Connection from "../db/connect.js"
import { accountString } from "../constance/entityName.js"

const findAccountByUsername = async ({
  username,
  option = [{ isLocked: 0 }],
}) =>
  await Connection.getInstance()
    .getRepository(accountString)
    .findOneBy(
      option.map((item) => {
        return { username, ...item }
      })
    )

const findAccountById = async ({ idAccount, option = [{ isLocked: 0 }] }) =>
  await Connection.getInstance()
    .getRepository(accountString)
    .findOneBy(
      option.map((item) => {
        return { idAccount, ...item }
      })
    )

const updateAccountById = async ({ idAccount, dataSet }) =>
  await Connection.getInstance().getRepository(accountString).update(
    {
      idAccount,
    },
    dataSet
  )

const updateAccountByUsername = async ({ username, dataSet }) =>
  await Connection.getInstance().getRepository(accountString).update(
    {
      username,
    },
    dataSet
  )

export { findAccountByUsername, findAccountById, updateAccountById, updateAccountByUsername }
