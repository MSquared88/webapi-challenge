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

router.get('/:id', validateProjectId, (req, res) => {
    const id = req.params.id

    projectsDb.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => res.status(500).json({errMessage: "Database could not get project"}))
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    const id = req.params.id

    projectsDb.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => res.status(500).json({message: "database could not get actions"}))
})

router.post('/', validateNewProject, (req, res) => {
    const newProject = req.body

    projectsDb.insert(newProject)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => res.status(500).json({Message: "Database could not add project"}))
})

router.put('/:id', validateNewProject, validateProjectId, (req, res) => {
    const id = req.params.id
    const changes = req.body

    projectsDb.update(id, changes)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => res.status(500).json({message: "database could not update project"}))
})

router.delete('/:id', validateProjectId, (req, res) => {
    const id = req.params.id 

    projectsDb.remove(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => res.status(500).json({message: "Database could not delete project"}))
})

function validateProjectId(req, res, next) {
    const id = req.params.id 

    projectsDb.get(id)
    .then(project => {
        if(!project){
            res.status(404).json({message: "That project id does not exsist"})
        }
        else next()
    })
    
}

function validateNewProject(req, res, next) {
    const newProject = req.body 
    
    if(!newProject.name || !newProject.description){
        res.status(400).json({message: "name and description are required fields"})
    }
    else next()
}

module.exports = router