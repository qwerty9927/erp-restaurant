import { ForbiddenRequest } from "../core/error.response.js"

const accessible = (roles = []) => {
  return (req, res, next) => {
    const isAccessed = roles.some(role => {
      return req.permissions.includes(role)
    })
    isAccessed ? next() : next(new ForbiddenRequest("Can not access this route"))
  }
}

export default accessible