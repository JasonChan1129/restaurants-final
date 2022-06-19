const Restaurant = require('../restaurant');
const User = require('../user');
const seederRestaurantList = require('../../models/seeds/restaurant.json').results;
const seederUserList = require('../../models/seeds/user.json').data;
const bcrypt = require('bcryptjs');

const db = require('../../config/mongoose');

db.once('open', async () => {
	seederUserList.forEach(seedUser => {
		bcrypt
			.genSalt(10)
			.then(salt => bcrypt.hash(seedUser.password, salt))
			.then(hash => {
				User.create({ email: seedUser.email, password: hash })
					.then(user => {
						Promise.all(
							seederRestaurantList.map(restaurant => {
								if (seedUser.restaurants.includes(restaurant.id)) {
									restaurant.userId = user._id;
									return Restaurant.create({
										...restaurant,
										nameEng: restaurant.name_en,
										googleMap: restaurant.google_map,
									});
								}
							})
						);
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	});

	console.log('done!');
});
