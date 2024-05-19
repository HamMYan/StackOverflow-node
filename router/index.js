const router = require('express').Router()
const { body } = require('express-validator')
const MainControler = require('../controller/MainControler')
const { Questions, Categories, QuestionsCategories, Comments } = require('../model/index')

router.get('/', MainControler.homePage)
router.get('/addPage', MainControler.addQuestionPage)
router.get('/topQuestions', MainControler.topQuestionsPage)
router.get('/answer/:id', MainControler.question)

router.post('/addQuestion', [
  body('question').notEmpty().withMessage('Question is required'),
  body('category').isNumeric().withMessage('Select category'),
],
  MainControler.addQuestion
);

router.post('/addCom/:id',MainControler.addComment)

module.exports = router