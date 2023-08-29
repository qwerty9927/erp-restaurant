import { categoryString, productString } from "../constance/entityName.js"
import Connection from "../db/connect.js"

// Product

const findProductById = async ({ idProduct, relations = {}, select = {} }) => {
  return await Connection.getInstance()
    .getRepository(productString)
    .findOne({ where: { idProduct }, relations, select })
}

const findProduct = async ({
  where = {},
  limit = 50,
  skip = 0,
  relations = {},
  select = {},
}) => {
  return await Connection.getInstance().getRepository(productString).find({
    where,
    take: limit,
    skip,
    relations,
    select,
  })
}

const updateProductById = async ({ idProduct, dataSet }) => {
  return await Connection.getInstance().getRepository(productString).update(
    {
      idProduct,
    },
    dataSet
  )
}

// Category

const findCategoryByName = async ({
  categoryName,
  relations = {},
  select = {},
}) => {
  return await Connection.getInstance().getRepository(categoryString).findOne({
    where: {
      categoryName,
    },
    relations,
    select,
  })
}

const findCategoryById = async ({
  idCategory,
  relations = {},
  select = {},
}) => {
  return await Connection.getInstance().getRepository(categoryString).findOne({
    where: {
      idCategory,
    },
    relations,
    select,
  })
}

const findCategory = async ({
  where = {},
  limit = 10,
  skip = 0,
  relations = {},
  select = {},
}) => {
  return await Connection.getInstance()
    .getRepository(categoryString)
    .find({ where, take: limit, skip, relations, select })
}

export {
  findProductById,
  findProduct,
  updateProductById,
  findCategoryByName,
  findCategory,
  findCategoryById,
}
