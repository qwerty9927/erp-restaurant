
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

    case 4: {
      testFillterNullField()
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

const testFillterNullField = () => {
  const needHandle = {
    "receiptType": "food",
    "idSupplier": 1,
    "idStaff": 1,
    "note": null,
    "receiptDetail": [
        {
            "name": "Tom",
            "quantity": 10,
            "priceOfOne": 100000,
            "unit": null
        },
        {
            "name": "Cua",
            "quantity": 10,
            "priceOfOne": 50000,
            "unit": "KG"
        }
    ],
    "object": {
      "name": "a",
      "age": 12,
      "gender": null
    }
  }
  const recursion = (object) => {
    Object.entries(object).forEach(([key, value]) => {
      if(value === null){
        console.log("Null value: ", key)
        delete(object[key])
      } else if (Array.isArray(value)) {
        value.forEach(item => {
          recursion(item)
        })
      } else if(typeof value === "object") {
        recursion(value)
      }
    })
  }
  recursion(needHandle)
  console.log(needHandle)
}

export default jsTest