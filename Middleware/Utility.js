
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    } catch(error) {
        throw new Error('Hashing failed', error)
    }
}

module.exports.verifyPassword = async(password1,password2,cb) =>{
    bcrypt.compare(password1,password2,(err,isMatch)=>{
        cb(err,isMatch);
    });
}

module.exports.tokencreator = async (_id)=>{
    return jwt.sign({_id: _id}, JWT_SECRET);
}
