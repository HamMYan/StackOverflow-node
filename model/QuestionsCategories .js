module.exports = (sequelize,Sequelize) => {
    const QuestCategories = sequelize.define('question_categories',{})
    return QuestCategories
}