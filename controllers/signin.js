const handleSignin = (req, res, bcrypt, db) => {
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json('Invalid registration')
    }
    db.select('email', 'hash').from('login')
      .where('email', '=', email)
      .then(data => {
        const passwordIsValid = bcrypt.compareSync(password, data[0].hash);
        if (passwordIsValid){
          return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
          res.status(400).json('Your email or password is incorrect')
        }
      })
      .catch(err => res.status(400).json('Your email or password is incorrect'))
}

   module.exports = {
       handleSignin: handleSignin
   }