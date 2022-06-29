// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { validateId, validateProject } = require('./projects-middleware');
const router = express.Router();

// GET
router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            next(error);
            res.status(500).json({
                message: 'Error retrieving projects',
            })
        })
});

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.project);
});


router.get('/:id/actions', validateId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next)
});      


// POST
router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(next)
});


// PUT
router.put('/:id', validateId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)  
}); 


//DELETE
router.delete('/:id', validateId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            next(error);
            res.status(500).json({ message: "Error deleting project" })
        })
});

module.exports = router;