const It = require('./It')

const getAllIt = async (req , res) =>{
    const data = await It.find()

    res.status(200).send({data})
}

module.exports = {
    getAllIt
}