/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name: {
      type: 'string'
    },

    calendriers: {
    	collection: 'Calendrier'
    }
  },

  
  findByNom: function (nom, cb) {
    sails.log.info("Méthode User.findByName "+ nom);

    User.findOne({name : nom})
    .exec(function(err, utilisateur) {
      sails.log.info(utilisateur);
      return cb(null, utilisateur);    
    });
  }


};

