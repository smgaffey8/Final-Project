var mongoose = require('mongoose'),
    submissionSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        url: String,
        title: String,
        description: String,
        votes: Number,
        created: {
            type: Number,
            default: function() {
                return Date.now();
            }
        },
    });

var Submission = mongoose.model('submission', submissionSchema);

function createSubmission(attributes) {
    var submission = new Submission(attributes);
    submission.save(function(err, doc) {
        if (err) {
            console.log("The Error: " + err);
        } else {
            console.log("The Doc " + doc);
        }
    });
}

function findSubmissions(query, req, res) {

    Submission.find(query || {}, function(err, subs) {
        if (err) {
            console.log("Error getting people: ", err);
        } else {
            console.log("The Entries: \n", subs);
            //submissions = subs;
            //console.log("res:", res)
            res.send(subs);
        }
    });
}

// function newVote(query, req){
//   Submission.update(req.body, {$inc: {votes:1}})
// }



module.exports = {
        newSubmission: function(req, res) {
            if (req.cookies.submitted) {
                res.send("Already Submitted");
            } else {
                //add a a submission
                res.cookie('submitted', true);
                console.log("Cookies :  ", req.cookies);
                createSubmission({
                    name: req.body.name,
                    url: req.body.url,
                    title: req.body.title,
                    description: req.body.description,
                    votes: req.body.votes
                });

                //findSubmissions();
                res.send('Submission Successful');
            }
        },

        newVote: function(req, res) {
            //console.log("Cookies :  ", req.cookies);
            if (req.cookies.voted) {


                res.send("You already voted");
            } else {

                res.cookie('voted', true);
                Submission.findOneAndUpdate(req.body.name, {
                    $inc: {
                        votes: 1
                    }
                }, {
                    new: true
                }, function(err, doc) {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                    console.log(doc);
                });
                res.send("yup");

                //findSubmissions({}, req, res)
            }
        },

        findSubmissions: function(query, req, res) {
            //console.log("res:", res)
            Submission.find(query || {}, function(err, subs) {
                if (err) {
                    console.log("Error getting people: ", err);
                } else {
                    console.log("The Entries: \n", subs);
                    //submissions = subs;
                    //console.log("res:", res)
                    res.send(subs);
                }
            });
        },



        removeSubmission: function(req, res) {
            submissions.splice(+req.params.submissionIndex, 1);
            res.send("Submission Removed")
        },
    }
    // module.exports = mongoose.model('submission', submissionSchema);

// module.exports = mongoose.model('User', UserSchema);
// module.exports = {
//         newSubmission: function(req, res) {
//             if (req.cookies.submitted) {
//                 res.send("Already Submitted");
//             } else {
//                 //add a a submission
//                 res.cookie('submitted', true);
//                 console.log("Cookies :  ", req.cookies);
//                 createSubmission({
//                     name: req.body.name,
//                     url: req.body.url,
//                     title: req.body.title,
//                     description: req.body.description,
//                     votes: req.body.votes
//                 })
//
//                 //findSubmissions();
//                 res.send('Submission Successful');
//             }
//         }
