const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const usePassport = require('./config/passport');
const flash = require('connect-flash');

const routes = require('./routes');
// connect to mongoDB
require('./config/mongoose');

const port = process.env.PORT || 3000;

const app = express();

// set up view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// middleware
app.use(express.static('public'));
app.use(
	session({
		secret: 'ThisIsMySecret',
		resave: false,
		saveUninitialized: true,
	})
);
usePassport(app);
app.use(flash());
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated();
	res.locals.users = req.user;
	res.locals.success_msg = req.flash('success_msg');
	res.locals.warning_msg = req.flash('warning_msg');
	res.locals.danger_msg = req.flash('danger_msg');
	next();
});
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(routes);

app.listen(port, () => {
	console.log(`Server is listening to localhost:${port}`);
});
