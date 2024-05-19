module.exports = (sequelize,Sequelize) => {
    const Categories = sequelize.define('categories',{
        name: Sequelize.STRING
    })
    return Categories
}   