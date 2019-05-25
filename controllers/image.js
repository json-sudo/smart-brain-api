const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '297d5f8050644a7287e76647081bf82f'
});

const handleAPICall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {res.json(data)})
    .catch(err => res.status(400).json('API call failed'))
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    return db('users').where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
        res.json(entries[0]);
      })
      .catch(err => res.status(400).json('unable to get entries '))
}

module.exports = {
    handleImage,
    handleAPICall
}