const handleProfileRequest = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users').where({id: id})
      .then(user => {
        user.length ? res.json(user[0]) : res.status(404).json('Not Found')
      })
      .catch(err => res.status(404).json('error getting user'))
}

module.exports = {
    handleProfileRequest
}