/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

	/**
   * `UserController.findByName()`
   */
   findByName: function (req, res) {
    sails.log.info("Test recherche par nom " + req.param("name"));
    
    
    utilisateur = User.findByNom(req.param('name'),
      function(err, utilisateur) {
        return res.json(utilisateur);
      });
  }
};

