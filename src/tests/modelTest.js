import Connection from "../db/connect.js"

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

const testAccountEntity = async () => {
  const result = await Connection.getInstance().getRepository("account").find()
  console.log(result)
}

const testApEntity = async () => {
  const result = await Connection.getInstance().manager.find("account_permission")
  console.log(result)
}

const testRelationAp_A = async () => {
  const result = await Connection.getInstance().getRepository("account_permission").find({
    relations: {
      accountRelation: true
    }
  })
  console.log(result)
}

export default modelTest