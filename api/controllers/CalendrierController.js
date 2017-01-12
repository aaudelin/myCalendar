/**
 * CalendrierController
 *
 * @description :: Server-side logic for managing calendriers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	afficherCalendrier: function (req, res) {
		
		return res.view('calendrier', {title: "Mon calendrier"});
	}
	
};

