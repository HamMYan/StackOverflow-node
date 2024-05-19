module.exports = (sequelize,Sequelize) =>{
    const Questions = sequelize.define('questions',{
        question: Sequelize.STRING
    })
    return Questions
}