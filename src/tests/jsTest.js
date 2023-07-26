
const jsTest = (req, res, next) => {
  switch(parseInt(req.params.key)){
    case 1: {
      const isAccessed = [1, 2, 3].some(role => {
        return [2].includes(role)
      })
      console.log(isAccessed)
      break
    }
// Result case 1: true
    case 2: {
      const metaData = {
        "receiptType": "food",
        "idSupplier": 1,
        "note": null,
        "receiptDetail": [
            {
                "name": "Tom",
                "quantity": 10,
                "price": 100000,
                "unit": "KG"
            },
            {
                "name": "Thot",
                "quantity": 10,
                "price": 500000,
                "unit": "UNIT"
            }
        ]
      }
      testDestructuring(metaData)
      break
    }
/** Result case 2: 
  food {
    idSupplier: 1,
    note: null,
    receiptDetail: [
      { name: 'Tom', quantity: 10, price: 100000, unit: 'KG' },
      { name: 'Thot', quantity: 10, price: 500000, unit: 'UNIT' }
    ]
  }
 */ 
    case 3: {
      testReduce()
      break
    }
  }
  
  res.send("Test done")
}

const testDestructuring = ({receiptType, ...rest}) => {
  console.log(receiptType, rest)
}

const testReduce = () => {
  let initValue = 0
  let array = [1, 2, 3, 4]
  array.reduce((pv, cv, ci) => {
    console.log(pv, cv, ci)
  })
}

export default jsTest