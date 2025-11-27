import jwt from"jsonwebtoken";
const generateToken=(id,role)=>{
 return jwt.sign(
      {id,role},
      process.env.JWT_SECRET ||"mehfin", // use .env for security
      { expiresIn:process.env.TOKEN_EXPIRY}
    );
}
    export default generateToken;