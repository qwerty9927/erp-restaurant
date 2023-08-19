import _ from "lodash"
const fillterNullField = (needHandle) => {
  Object.entries(needHandle).forEach(([key, value]) => {
    if(value === null){
      console.log("Null value: ", key)
      delete(needHandle[key])
    } else if (Array.isArray(value)) {
      value.forEach(item => {
        fillterNullField(item)
      })
    } else if(typeof value === "object") {
      fillterNullField(value)
    }
  })
}

const pickUpContentResponse = (array, selection = ["type", "msg", "path"]) => {
  return array.map(item => {
    return _.pick(item, selection)
  })
}

const appendToObject = (needHandle, property, value) => {
  if(Array.isArray(needHandle)){
    return needHandle.map(object => {
      object[property] = value
      return object
    })
  }
  return needHandle[property] = value
}

export {
  fillterNullField,
  pickUpContentResponse,
  appendToObject
}