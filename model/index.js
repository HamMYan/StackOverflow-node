const Sequelize = require('sequelize')

const sequelize = new Sequelize('stack_overflow', 'user', 'Pass@1234', {
    port: 3306,
    host: 'localhost',
    dialect: 'mysql'
});

const Questions = require('./Questions')(sequelize, Sequelize)
const Categories = require('./Categories')(sequelize, Sequelize)
const QuestionsCategories = require('./QuestionsCategories ')(sequelize, Sequelize)
const Comments = require('./Comments')(sequelize, Sequelize)

Questions.hasMany(QuestionsCategories)
Categories.hasMany(QuestionsCategories)
Questions.hasMany(Comments)

QuestionsCategories.belongsTo(Questions)
QuestionsCategories.belongsTo(Categories)
Comments.belongsTo(Questions)

sequelize.sync()

module.exports = { Questions, Categories, QuestionsCategories, Comments }