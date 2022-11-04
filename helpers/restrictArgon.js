import paseto from 'paseto'
const { V4 } = paseto
import {publicKeyObject} from "./keys.js"

const key = publicKeyObject

const restrict = (req, res, next) => {
  try {
    if (V4.verify(token, key)) {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(403).send('Unauthorized')
  }
}

export default restrict