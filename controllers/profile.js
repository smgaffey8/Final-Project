// var Profile = require('../models/profilemodel');
var User = require('../models/user');

function create(req, res) {

    var newDoc = new User(req.body);

    newDoc.save((err, doc) => {
        if (err) {
            return res.send(err);
        }
        res.send(doc);
    });
}

function get(req, res) {
    // get One
    if (req.params.id) {
        User.findOne({
            _id: req.params.id
        }, (err, document) => {
            if (err) {
                // if(err.name === "CastError" && err.kind === "ObjectId"){
                //     return res.send(`That ain't no ID`)
                // }

                return res.send(err);
            }
            if (!document) {
                return res.send('No one with that id');
            }
            res.send(document);
        });
    }
    // get Many
    else {
        User
            .find({})
            .exec((err, documents) => {
                res.send(err || documents);
                if (err) {
                    return res.send(err);
                }
                res.send(document);

            });
    }

}

function me(req, res) {

    console.log("Session: ", req.session);
    User
        .findOne({
            _id: req.session.uid
        })
        .exec((err, document) => {

            if (err) {
                return res.send(err);
            } else {
                res.send(document);
            }

        });
}
module.exports = {
    create: create,
    get: get,
    me: me
};
