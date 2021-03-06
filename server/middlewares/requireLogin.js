// namingconvention: if export a single function, then use lower case, otherwise do capital for exporting a class like component for example.

// next is a function that is called when the middleware is finished. similar to done.
module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'You must login!' });
	}
	next();
};