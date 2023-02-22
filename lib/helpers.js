const bcrypt = require('bcrypt')

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
}

const comparePasswords = async (password, savedPassword) => {
    try 
    {
        return await bcrypt.compare(password, savedPassword)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    encryptPassword,
    comparePasswords
}