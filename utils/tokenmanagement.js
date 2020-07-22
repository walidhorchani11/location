const jwt = require('jsonwebtoken');

const SECRET = 'mysecret';
 const generateToken = async ({_id, email}) => {
     console.log('token', _id, email)
    const token = await jwt.sign({_id, email}, SECRET);
    console.log(token)
    return token;
}

 const verifyToken = (token) => {
   try {
       const { id } = jw.verify(token, SECRET);
       return id;
   }
   catch (err) {
       return null;

   }
}
module.exports = {generateToken, verifyToken};