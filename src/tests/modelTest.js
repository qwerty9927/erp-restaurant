import Connection from "../db/connect.js"
import { accountString, apString, categoryString, customerString, ingredientString, productPriceString, productString, receiptString, receiptdetailString, recipeString, supplierString, warehouseString } from "../constance/entityName.js"
import { appendToObject, getSelectData } from "../utils/index.js"
import { findAccountByUsername } from "../repository/auth.repository.js"
import { findCategory, findProduct } from "../repository/product.repository.js"
import productService from "../services/product.service.js"

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
    // Recipe
    case 11: {
      await testRecipeEntity()
      break
    }
    // Product price
    case 12: {
      await testProductPriceEntity()
      break
    }
    // Recipe_ingredient
    case 13: {
      await testRecipe_I()
      break
    }
    // Create product test
    case 14: {
      await testCreateProduct()
      break
    }
    // Customer
    case 15: {
      await testCustomerEntity()
      break
    }
    //
    // Product
    case 16: {
      await testProduct()
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
  // result = await Connection.getInstance().getRepository("account").findOneBy({
  //   isLocked: 1
  // })

  // // phoneNumberVerification
  // Find account not active
  result = await findAccountByUsername({
    username: "0123412341",
    option: [{ isVerified: 0 }],
  })
  await Connection.getInstance().getRepository(accountString).insert({
    username: "0123412341",
  })
  console.log(result)
}
// 2
const testApEntity = async () => {
  let result
  // result = await Connection.getInstance().manager.find("account_permission")
  result = await Connection.getInstance().manager.findOne(accountString, {
    where: {
      username: "Minh Tan 1"
    },
    relations: {
      account_permissionsRelation: true
    }
  })
  console.log(result)

  const notExistPermission = [1, 2, 3, 4].filter((permission) => {
    return result.account_permissionsRelation.every((item) => {
      return item.idPermission !== permission
    })
  })
  console.log(notExistPermission)
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
    await transactionEntityManager.getRepository(receiptdetailString).insert(appendToObject(receiptDetail, "idReceipt", resultInsertReceipt.raw.insertId))
  })

  console.log(result)
}
//11
const testRecipeEntity = async () => {
  let result = null
  result = await Connection.getInstance().getRepository(recipeString).find()
  console.log(result)
}
//12
const testProductPriceEntity = async () => {
  let result = null
  result = await Connection.getInstance().getRepository(productPriceString).find()
  console.log(result)
}
//13
const testRecipe_I = async () => {
  let result = null
  result = await Connection.getInstance().getRepository(recipeString).find({
    relations: {
      ingredientRelation: true
    }
  })
  console.log(result)
}
//14
const testCreateProduct = async () => {
  // Transaction product, productprice and recipe
  const productName = "Heo nuong"
  const productType = "food"
  const idCategory = 1
  const recipeInfo = [
      {
          idIngredient: 2,
          quantity: 0.5,
          unit: "KG"
      }, {
          idIngredient: 3,
          quantity: 100,
          unit: "G"
      }
  ]
  let resultInsertProduct = null
  await Connection.getInstance().transaction(async transactionEntityManager => {
    resultInsertProduct = await transactionEntityManager.getRepository(productString).insert({
      productName,
      productType,
      idCategory
    })
    await transactionEntityManager.getRepository(recipeString).insert(appendToObject(recipeInfo, "idProduct", resultInsertProduct.raw.insertId))
  })

   // Calculate cost and price
  // 1. Query ingredient corresponding to recipe and select ingredient.price
  const ingredientOfRecipe = await Connection.getInstance().getRepository(recipeString).find({
    relations: {
      ingredientRelation: true
    },
    where: {
      idProduct: resultInsertProduct.raw.insertId
    }
  })
  console.log(ingredientOfRecipe)
}
//15
const testCustomerEntity = async () => {
  let result = null
  result = await Connection.getInstance().getRepository(customerString).find()
  console.log(result)
}
//16
const testProduct = async () => {
  let result = null

  // result = await productService.getAllProductOfCategory(1)
  // console.log(result)

  // Get category with product
  // result = await Connection.getInstance().getRepository(categoryString).find({
  //   relations: {
  //     productRelation: true,
  //   },
  //   select: {
  //     productRelation: {
  //       productName: true
  //     }
  //   }
  // })
  // console.log(result[0].productRelation)

  // Test getSelectData
  // result = getSelectData()

  // Test category
  result = await findCategory({where: {categoryName: "mon chinh"}})
  console.log(result)
}

export default modelTest