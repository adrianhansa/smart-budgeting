const jwt = require('jsonwebtoken')

const auth = async (req,res,next)=>{
    const token = req.header("token")
    if(!token) res.status(403).json({message:"Invalid token"})
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET)
    if(!verifiedUser) return res.status(403).json({message:"Unauthorized"})
    req.user = verifiedUser.id
    next()
}

module.exports = auth