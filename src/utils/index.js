
const fillterNullField = () => {

}

const closures = () => {

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
  closures,
  appendToObject
}