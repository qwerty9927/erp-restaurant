
const fillterNullField = () => {

}

const closures = () => {

}

const appendAllObject = (array, property, value) => {
  return array.map(object => {
    object[property] = value
    return object
  })
}

export {
  fillterNullField,
  closures,
  appendAllObject
}