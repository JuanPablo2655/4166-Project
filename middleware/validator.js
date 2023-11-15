exports.validateId = (req, res, next) => {
	const id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		const error = new Error(`Invalid event ${id}`);
		error.status = 400;
		return next(error);
	}
};
