const { text } = require('express');
const { Questions, Categories, QuestionsCategories, Comments } = require('../model/index')
const { validationResult } = require('express-validator');


class MainControler {
    constructor() {
        throw new Error('MainControler is abstract class')
    }
    static async homePage(req, res) {
        res.render('index')
    }
    static async addQuestionPage(req, res) {
        const categories = await Categories.findAll()
        res.render('addQuestion', { categories })
    }
    static async addQuestion(req, res) {
        const categories = await Categories.findAll()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.error = errors.array();
            const obj = {};
            for (let err of errors.array()) {
                if (err.path === 'category') {
                    obj.categoryErr = err.msg;
                }
                if (err.path === 'question') {
                    obj.questionErr = err.msg
                }
            }
            const categories = await Categories.findAll()
            const { questionErr, categoryErr } = obj
            return res.render('addQuestion', { categories, questionErr, categoryErr });
        } else {
            delete req.session.errors;
            await Questions.create({
                question: req.body.question
            })

            const questionId = await Questions.findOne({
                where: {
                    question: req.body.question
                }
            })
            const { id } = questionId
            await QuestionsCategories.create({
                questionId: id,
                categoryId: req.body.category,
            })
            res.redirect("/addPage");
        }
    }
    static async topQuestionsPage(req, res) {
        const questions = await Questions.findAll()
        res.render('topQuestions', { questions })
    }
    static async question(req, res) {
        const category = await QuestionsCategories.findOne({
            where: {
                questionId: req.params.id
            },
            include: [
                { model: Categories }
            ]
        });
        const question = await Questions.findOne({
            where: {
                id: req.params.id
            }
        })
        const comments = await Comments.findAll({
            where: {
                questionId: req.params.id
            }
        })
        const commentsCount = comments.length
        res.render('question', { category, question, comments, commentsCount })
    }
    static async addComment(req, res) {
        const time = new Date()
        await Comments.create({
            questionId: req.params.id,
            text: req.body.text,
            email: req.body.email,
            time: time.toDateString()
        })
        res.redirect(`/answer/${req.params.id}`)
    }
}

module.exports = MainControler  