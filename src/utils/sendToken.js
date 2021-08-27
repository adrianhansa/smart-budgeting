const jwt = require('jsonwebtoken')

const sendToken = (user,statusCode,res)=>{
    const token = jwt.sign({id:user._id,name:user.name,email:user.email},process.env.JWT_SECRET)
    res.status(statusCode).header('token',token).json({isAuth:true})
    //in react I get the header:
    //const response = await axios.post('.../register')
    //const token = response.headers.token
}

module.exports = sendToken