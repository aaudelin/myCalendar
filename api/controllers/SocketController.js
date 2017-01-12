/**
 * SocketController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

  /**
   * `SocketController.rejoindre()`
   */
   rejoindre : function (req, res) {

    if (!req.isSocket) {
      sails.log.error('Ce n est pas une requete IO');
      return res.badRequest();
    }
    sails.log.info('Un utilisateur rejoint la room');
    sails.sockets.join(req, 'roomPrivee');
    return res.ok();
  },

  /**
   * `SocketController.saluer()`
   */
   saluer: function (req, res) {

    if (!req.isSocket) {
      sails.log.error('Ce n est pas une requete IO');
      return res.badRequest();
    }
    sails.log.info('Entree dans la méthode de salutation avec le message : '+req.param('message'));
    sails.sockets.broadcast('roomPrivee', 'salutation', {message: req.param('message'), id: sails.sockets.getId(req)});
    return res.ok();
  },

/**
* `SocketController.creerEvenement()`
*/
creerEvenement : function (req, res) {
    //Gestion du retour
    var retour;

    // Gestion de l'objet
    var dataEvenementCreeJson;
    sails.log.info("Test de la date de la requete : ", req.param('date'));
    var date = new Date(Date.parse(req.param('date')));
    date.setDate(date.getDate()+1);
    dataEvenementCreeJson = {type: req.param('type'), objet: req.param('objet'), date: date};

    sails.log.info("Test de la date : ", dataEvenementCreeJson.date);
    // Creation d'evenement soumis en BDD
    Evenement.create(dataEvenementCreeJson).exec(function (err, elementCree) {
      retour = true;
      if (err) {
        sails.log.error("Error de traitement BDD : ", err);
        return res.serverError();
      }
      sails.log.info("Création de l'évenement : "+elementCree.id + " Retour : "+retour);

    // Gestion des sockets
    if (!req.isSocket) {
      sails.log.error('Ce n est pas une requete IO');
      return res.badRequest();
    }
    sails.log.info('Création d un evenement : '+req.param('type')+'/'+req.param('objet'));
    sails.sockets.broadcast('roomPrivee', 'creer-evenement', elementCree);
    return res.ok();
  });


  },

  /**
* `SocketController.supprimerEvenement()`
*/
supprimerEvenement : function (req, res) {
    //Gestion du retour
    var retour;

    // Gestion de l'objet
    var dataEvenementCreeJson;
    dataEvenementCreeJson = {id: req.param("id")};

    // Creation d'evenement soumis en BDD
    Evenement.destroy(dataEvenementCreeJson).exec(function (err) {
      retour = true;
      if (err) {
        sails.log.error("Error de traitement BDD : ", err);
        return res.serverError();
      }
      sails.log.info("Suppression de l'évenement : "+retour);

    // Gestion des sockets
    if (!req.isSocket) {
      sails.log.error('Ce n est pas une requete IO');
      return res.badRequest();
    }
    sails.log.info('Suppression d un evenement : '+req.param('id'));
    sails.sockets.broadcast('roomPrivee', 'supprimer-evenement', dataEvenementCreeJson);
    return res.ok();
  });


  }


};

