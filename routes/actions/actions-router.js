const express = require('express');

actionDb = require('../../data/helpers/actionModel.js');
projectsDb = require('../../data/helpers/projectModel')

const router = express.Router();

router.get('/', (req, res) => {
    actionDb.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => res.status(500).json({message: 'Sever could not get actions'}))
});

router.get('/:id',  validateActionId, (req, res) => {
    const id = req.params.id
    
    actionDb.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => res.status(500).json({message: 'Sever could not get action'}))
});

router.post('/' ,  validateNewAction, (req, res) => {
    const newAction = req.body

    actionDb.insert(newAction)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => res.status(500).json({message:"database could not add action"}))
} 
)

router.put('/:id', validateActionId, validateNewAction, (req, res) => {
    const id = req.params.id
    const changes = req.body

    actionDb.update(id, changes)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => res.status(500).json({errMessage: "internal database error"}))
})

router.delete('/:id' ,validateActionId, (req, res) => {
    const id = req.params.id

    actionDb.remove(id)
    .then(action => {
        res.status(200).json({message: "action successfully deleted."})
    })
    .catch(err => res.status(500).json({errMessage: "Could not delete action."}))
})

function validateActionId(req, res, next) {
    const id = req.params.id
    
    actionDb.get(id)
    .then(action => {
        if(!action){
            res.status(404).json({errMessage: "That action id does not exsist"})
        }
        else next()
    })
    .catch(err => {
        res.status(500).json("server could not find action")
    })
}

function validateNewAction(req, res, next){
    const newAction = req.body

    if(!newAction.notes || !newAction.description || !newAction.project_id){
        res.status(400).json({message: "Notes, description, and project_id are required fields"})
    }
    else {
        projectsDb.get(newAction.project_id)
        .then(project => {
        
            if(!project){
                res.status(404).json({errMessage: "That project id does not exsist"})
            }
            else next()
        })

    }
}

module.exports = router