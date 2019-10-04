const express = require('express');

actionDb = require('../../data/helpers/actionModel.js');
projectsDb = require('../../data/helpers/projectModel')

const router = express.Router();

router.get('/', (req, res) => {

    projectsDb.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => res.status(500).json({errMessage: "Database could not get projects"}))
})

router.get('/:id', (req, res) => {
    id = req.params.id
    
    projectsDb.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => res.status(500).json({errMessage: "Database could not get project"}))
})

module.exports = router