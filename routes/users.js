var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt-as-promised');
//what is knex file  config development
const config = require('../knexfile')['development'];
const knex = require('knex')(config);

/* GET users listing. */
router.get('/', function(req, res, next) {

	if (!req.session.userId) {
		res.send('please log in');
	} else {
		knex('users')
			.select()
			.where('users.id', req.session.userId)
			.then((response) => {
				res.send(response);
			});
	}
});

// console.log('hello james');
router.post('/', (req, res, next) => {
	// console.log('POST Users Req Body:', req.body);
	bcrypt.hash(req.body.password, 12)
		.then((hashed_password) => {
			return knex('users')
				.insert({
					username: req.body.username,
					hashed_password: hashed_password
				}, 'id')

				.then((id) => {
					console.log('RETURN ID', id);
					res.session.userId = id;


				});
		})
		.then((users) => {
			const user = users[0];
			delete user.hashed_password;
			res.send(user);
		})


		.catch((err) => {
			// console.log('POST Users Error:', err);
			res.send(err);
		});

});


// if(req.session.id){
// 	select(*)
// 	where(id = req.session.id)
// }

module.exports = router;
