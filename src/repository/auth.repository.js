import Connection from "../db/connect.js";
import { accountString } from "../constance/entityName.js";

const findUserByUsername = async (username) => await Connection.getInstance().getRepository(accountString).findOneBy({
  username
})

const findUserById = async (idAccount) => await Connection.getInstance().getRepository(accountString).findOneBy({
  idAccount
})

const updateKeyPair = async ({accessKey, refreshKey, idAccount}) => await Connection.getInstance().getRepository(accountString).update({
  idAccount
}, {
  accessKey,
  refreshKey
})

export {
  findUserByUsername,
  findUserById,
  updateKeyPair
}