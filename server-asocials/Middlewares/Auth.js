import jwt from "jsonwebtoken"

const Auth = async (req,res,next)=>{
    try {
        const token =await req.headers.authorization.split(" ")[1]
        console.log(token);

        if(token){
            const verifiedData = jwt.verify(token,process.env.JWT_KEY)
            req.userId = verifiedData?.id
            next()
        }else{
            res.status(500).json("Unauthorized Request!")
    }
    } catch (error) {
        console.log(error);
        res.status(500).json("Unauthorized Request!")
    }
}

export default Auth;