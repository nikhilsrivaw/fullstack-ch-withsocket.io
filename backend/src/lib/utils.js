import jwt from "jsonwebtoken"

export const genratetoken = (userId , res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn:"7d"
    })
    
    res.cookie("jwt" , token ,{
        maxAge :7*24*60*60*1000,
        httpOnly:true, // prevent XSS attacks croos-site scripting attacks 
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    })

    return token 
}

