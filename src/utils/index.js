import _ from "lodash"
const fillterNullField = (needHandle) => {
  Object.entries(needHandle).forEach(([key, value]) => {
    if (value === null) {
      console.log("Null value: ", key)
      delete needHandle[key]
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        fillterNullField(item)
      })
    } else if (typeof value === "object") {
      fillterNullField(value)
    }
  })
}

const pickUpContentResponse = (array, selection = ["type", "msg", "path"]) => {
  return array.map((item) => {
    return _.pick(item, selection)
  })
}

const pickUpContent = (array, selection = []) => {
  return array.map((item) => {
    return _.pick(item, selection)
  })
}

const getSelectData = (selection = []) => {
  const result = {}
  selection.map((el) => {
    if (/\./.test(el)) {
      const pairKey = el.split(".")
      if (!result[pairKey[0]]) {
        result[pairKey[0]] = {}
      }
      result[pairKey[0]][pairKey[1]] = true
    } else {
      result[el] = true
    }
  })
  return result
}

const appendToObject = (needHandle, property, value) => {
  if (Array.isArray(needHandle)) {
    return needHandle.map((object) => {
      object[property] = value
      return object
    })
  }
  return (needHandle[property] = value)
}

export {
  fillterNullField,
  pickUpContentResponse,
  appendToObject,
  pickUpContent,
  getSelectData,
}
