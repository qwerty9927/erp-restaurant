import { check } from "express-validator"

const validateLogin = () => [
  check("username", "Username is not empty").not().isEmpty(),
  check("password", "Password is not empty").not().isEmpty()
]

const validateRegister = () => [
  check("phoneNumber", "Phone number is not empty").not().isEmpty(),
  check("phoneNumber", "Phone number is invalid").isMobilePhone(["vi-VN"]),
  check("email", "Email is invalid").isEmail(),
  check("customerName", "Customer name is not empty").not().isEmpty(),
  check("customerName", "Customer name is invalid").escape(),
  check("password", "Password is not empty").not().isEmpty(),
  check("password", "Password more than 8 degits").isLength({ min: 8 }),
  check("password", "Password is invalid").escape(),
]

const validatePhoneNumber = () => [
  check("phoneNumber", "Phone number is not empty").not().isEmpty(),
  check("phoneNumber", "Phone number is invalid").isMobilePhone(["vi-VN"])
]

const validator = {
  validateLogin,
  validateRegister,
  validatePhoneNumber
}

export default validator