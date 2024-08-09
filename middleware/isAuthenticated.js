const jwt=require("jsonwebtoken")

const isAuthenticated=async(req,res,next)=>{
  try {
    const token=req.cookies.token
    //console.log("Token",token)
    if(!token){
        return res.status(401).json({message:"No token"})
    }
    const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY)
    // console.log("decoded",decoded)
    if(!decoded){
        return res.status(401).json({message:"Token invalid"})
    }
    req.id=decoded.userId
    next()
  } catch (error) {
    console.log("Error in auntication middleware",error)
  }
}
module.exports= isAuthenticated