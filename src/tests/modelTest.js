import Connection from "../db/connect.js"
import { accountString, apString } from "../constance/entityName.js"

const modelTest = async (req, res, next) => {
  const key = parseInt(req.params.key)
  switch(key) {
    // Account
    case 1: {
      await testAccountEntity()
      break
    }

    // Account permission
    case 2: {
      await testApEntity()
      break
    }
    
    // Relation
    case 3: {
      await testRelationAp_A()
      break
    }
  }
  res.send("Test done")
}

// 1
const testAccountEntity = async () => {
  let result = null
  // Find all account
  // result = await Connection.getInstance().getRepository("account").find()

  // Find account by (isLocked = 0 || isLocked = 1)
  // result = await Connection.getInstance().getRepository("account").findOneBy(  
  //   [{isLocked: 0}].map(item => {
  //   return { username: "Minh Tan", ...item }
  // }))

  // Find account by (isLocked = 1)
  result = await Connection.getInstance().getRepository("account").findOneBy({
    isLocked: 0
  })

  console.log(result)
}

// 2
const testApEntity = async () => {
  const result = await Connection.getInstance().manager.find("account_permission")
  console.log(result)
}

// 3
const testRelationAp_A = async () => {
  let result = null

  // Query parent and child data
  // result = await Connection.getInstance().getRepository("account_permission").find({
  //   relations: {
  //     accountRelation: true
  //   }
  // })

  // Transaction test
  result = await Connection.getInstance().transaction(async (transactionEntityManager) => {
    await transactionEntityManager.getRepository(accountString).insert({
      username: "Minh Tan 3",
      password: "12345678"
    })
    await transactionEntityManager.getRepository(apString).insert({
      idPermission: 5,
      idAccount: 4
    })
  })

  console.log(result)
}

export default modelTest