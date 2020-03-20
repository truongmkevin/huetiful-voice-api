module.exports = {
    get: (req, res) => res.send(req.params.id),
    add: (req, res) => res.send(req.body),
    edit: (req, res) => res.send(req.body),
    delete: (req, res) => res.send(req.params.id)
}