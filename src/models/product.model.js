

class Product {
  constructor(idProduct, productName, image, productType, isDirect, isDelete, idCategory) {
    this.idProduct = idProduct
    this.productName = productName
    this.image = image
    this.productType = productType
    this.isDirect = isDirect
    this.isDelete = isDelete
    this.idCategory = idCategory
  }

  getIdProduct(){
    return this.idProduct
  }
}

export default Product