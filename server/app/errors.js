
module.exports.handleError = function(error, res) {
	if (!error ) return;
    console.log('ERROR: '+ error);
    if (res)
    	res.status(400).json({'error': error});
};
