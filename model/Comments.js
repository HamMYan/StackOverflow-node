module.exports = (sequelize,Sequelize) => {
    const Comments = sequelize.define('comments',{
        text: Sequelize.STRING,
        time: Sequelize.STRING,
        email: Sequelize.STRING
    })
    return Comments
}