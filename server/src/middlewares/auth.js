const jwt = require('jsonwebtoken')

module.exports = {
    authentication: (req, res, next) => {
        const headers = req.headers
        if (!headers.token) {
            res.json('Token needed')
        } else {
            jwt.verify(headers.token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.json('Token Invalid')
                } else {
                    res.userAccess = decoded.access
                    next()
                }
            })
        }
    }
}