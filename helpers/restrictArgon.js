import paseto from 'paseto'
const { V4 } = paseto
import { createPublicKey } from 'crypto'

const key = createPrivateKey(publicKey)
const token = 'v4.public.eyJ1cm46ZXhhbXBsZTpjbGFpbSI6ImZvbyIsImlhdCI6IjIwMjEtMDctMTlUMTA6MTM6MjIuOTM3WiIsImV4cCI6IjIwMjEtMDctMTlUMTI6MTM6MjIuOTM3WiIsImF1ZCI6InVybjpleGFtcGxlOmNsaWVudCIsImlzcyI6Imh0dHBzOi8vb3AuZXhhbXBsZS5jb20ifYZrfK1eH8d7Scp218_DPEX8H3ElIfzWWMu9UQVZYjyV585BEBV0wTRk-vZgtXq0y5z0euOE48a2Yd6TLKfA5Qs'

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