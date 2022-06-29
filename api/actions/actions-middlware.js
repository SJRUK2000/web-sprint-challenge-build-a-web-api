// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateId(req, res, next) {
    const id = req.params.id
    const actions = await Actions.get(id);
    if(!actions) {
        res.status(404).json({message: 'actions not found'})
    } else {
        req.actions = actions;
        next();
    }
}

function validateActions(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    if(!project_id || !description || !description.trim() || !notes || !notes.trim() || (completed == null) ) {
        res.status(400).json({message: 'please include missing information'});
    } else {
        req.description = description.trim();
        req.notes = notes.trim();
        next();
    }
}

module.exports = { validateId, validateActions };