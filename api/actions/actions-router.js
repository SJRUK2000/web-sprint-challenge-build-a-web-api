// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { validateId, validateActions } = require ('./actions-middlware');

const router = express.Router();

// GET
router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            next(error);
            res.status(500).json({
                message: 'Error retrieving actions',
            })
        })
});

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.actions);
});

// POST
router.post('/', validateActions, (req, res, next) => {
    Actions.insert(req.body)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
});


// PUT
router.put('/:id', validateId, validateActions, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
});


//DELETE
router.delete('/:id', validateId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            next(error);
            res.status(500).json({ message: "Error deleting action"})
        })
});

module.exports = router;