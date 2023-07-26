import Connection from "../db/connect.js"
import { accountString, apString, ingredientString, receiptString, receiptdetailString, supplierString, warehouseString } from "../constance/entityName.js"
import { appendAllObject } from "../utils/index.js"

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
    // Supplier
    case 4: {
      await testSupplierEntity()
      break
    }
    // Receipt
    case 5: {
      await testReceiptEntity()
      break
    }
    // ReceiptDetail
    case 6: {
      await testReceiptDetailEntity()
      break
    
    }
    // WareHouse
    case 7: {
      await testWareHouseEntity()
      break
    }
    // Ingredient
    case 8: {
      await testIngredientEntity()
      break
    }
    // Receipt-receiptDetail
    case 9: {
      await testReceipt_RD()
      break
    }
    // Transaction
    case 10: {
      await testTransaction()
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
// 4
const testSupplierEntity = async () => {
  let result = null
  result = await Connection.getInstance().getRepository(supplierString).find()
  console.log(result)
}
// 5
const testReceiptEntity = async () => {
  let result = null
  result = await Connection.getInstance().getRepository(receiptString).find()
  console.log(result)
}
// 6
const testReceiptDetailEntity = async () => {
  let result = null
  result = await Connection.getInstance().getRepository(receiptdetailString).find()
  console.log(result)
}
//7
const testWareHouseEntity = async () => {
  let result = null
  result = await Connection.getInstance().getRepository(warehouseString).find()
  console.log(result)
}
//8
const testIngredientEntity = async () => {
  let result = null
  result = await Connection.getInstance().getRepository(ingredientString).find()
  console.log(result)
}
//9
const testReceipt_RD = async () => {
  let result = null
  result = await Connection.getInstance().getRepository(receiptString).find({
    relations: {
      receiptDetailRelation: true
    }
  })
  console.log(result)
}
//10
const testTransaction = async () => {
  let result = null
  const receiptType = "food"
  const idSupplier = 1
  const idStaff = 1
  const total = 1000000
  const receiptDetail = [
    {
        "name": "Tom",
        "quantity": 10,
        "price": 100000,
        "unit": "KG"
    },
    {
        "name": "Thot",
        "quantity": 10,
        "price": 50000,
        "unit": "UNIT"
    }
  ]

  // result = appendAllObject(receiptDetail, "idReceipt", 1)
  result = await Connection.getInstance().transaction(async transactionEntityManager => {
    const resultInsertReceipt = await transactionEntityManager.getRepository(receiptString).insert({
      receiptType,
      idSupplier,
      idStaff,
      total
    })
    await transactionEntityManager.getRepository(receiptdetailString).insert(appendAllObject(receiptDetail, "idReceipt", resultInsertReceipt.raw.insertId))
  })

  console.log(result)
}

export default modelTest