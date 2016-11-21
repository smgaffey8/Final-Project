var Profile = require('../models/profilemodel');

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
            // .sort()
            // .limit()
            // .populate('headquarter')
            // Mongoose method chains MUST end with exec - its where you put your callback
            .exec((err, documents) => {
                // res.send(err || documents)
                if (err) {
                    return res.send(err);
                }
                res.send(documents);
            });
    }
}

module.exports = {
    create: create,
    get: get,
};

function imageuploader() {

    var thumb = $('#thumb');

    new AjaxUpload('imageUpload', {
        action: $('#newHotnessForm').attr('action'),
        name: 'image',
        onSubmit: function(file, extension) {
            $('#preview').addClass('loading');
        },
        onComplete: function(file, response) {
            thumb.load(function() {
                $('#preview').removeClass('loading');
                thumb.unbind();
            });
            thumb.attr('src', response);
        }
    });
}
// Master function, encapsulates all functions
function init() { // Master function, encapsulates all functions
    var video = document.getElementById("Video1");
    if (video.canPlayType) { // tests that we have HTML5 video support
        // if successful, display buttons and set up events
        document.getElementById("buttonbar").style.display = "block";
        document.getElementById("inputField").style.display = "block";

        // helper functions
        //  play video
        function vidplay(evt) {
            if (video.src == "") { // inital source load
                getVideo();
            }
            button = evt.target; //  get the button id to swap the text based on the state
            if (video.paused) { // play the file, and display pause symbol
                video.play();
                button.textContent = "||";
            } else { // pause the file, and display play symbol
                video.pause();
                button.textContent = ">";
            }
        }
        //  load video file from input field
        function getVideo() {
            var fileURL = document.getElementById("videoFile").value; // get input field
            if (fileURL != "") {
                video.src = fileURL;
                video.load(); // if HTML source element is used
                document.getElementById("play").click(); // start play
            } else {
                errMessage("Enter a valid video URL"); // fail silently
            }
        }



        //  button helper functions
        //  skip forward, backward, or restart
        function setTime(tValue) {
            //  if no video is loaded, this throws an exception
            try {
                if (tValue == 0) {
                    video.currentTime = tValue;
                } else {
                    video.currentTime += tValue;
                }

            } catch (err) {
                // errMessage(err) // show exception
                errMessage("Video content might not be loaded");
            }
        }
        //  display an error message
        function errMessage(msg) {
            // displays an error message for 5 seconds then clears it
            document.getElementById("errorMsg").textContent = msg;
            setTimeout("document.getElementById('errorMsg').textContent=''", 5000);
        }
        // change volume based on incoming value
        function setVol(value) {
            var vol = video.volume;
            vol += value;
            //  test for range 0 - 1 to avoid exceptions
            if (vol >= 0 && vol <= 1) {
                // if valid value, use it
                video.volume = vol;
            } else {
                // otherwise substitute a 0 or 1
                video.volume = (vol < 0) ? 0 : 1;
            }
        }
        //  button events
        //  Play
        document.getElementById("play").addEventListener("click", vidplay, false);
        //  Restart
        document.getElementById("restart").addEventListener("click", function() {
            setTime(0);
        }, false);
        //  Skip backward 10 seconds
        document.getElementById("rew").addEventListener("click", function() {
            setTime(-10);
        }, false);
        //  Skip forward 10 seconds
        document.getElementById("fwd").addEventListener("click", function() {
            setTime(10);
        }, false);
        //  set src == latest video file URL
        document.getElementById("loadVideo").addEventListener("click", getVideo, false);

        // fail with message
        video.addEventListener("error", function(err) {
            errMessage(err);
        }, true);
        // volume buttons
        document.getElementById("volDn").addEventListener("click", function() {
            setVol(-.1); // down by 10%
        }, false);
        document.getElementById("volUp").addEventListener("click", function() {
            setVol(.1); // up by 10%
        }, false);

        // playback speed buttons
        document.getElementById("slower").addEventListener("click", function() {
            video.playbackRate -= .25;
        }, false);
        document.getElementById("faster").addEventListener("click", function() {
            video.playbackRate += .25;
        }, false);
        document.getElementById("normal").addEventListener("click", function() {
            video.playbackRate = 1;
        }, false);
        document.getElementById("mute").addEventListener("click", function(evt) {
            if (video.muted) {
                video.muted = false;
                evt.target.innerHTML = "<img alt='volume on button' src='vol2.png' />"
            } else {
                video.muted = true;
                evt.target.innerHTML = "<img alt='volume off button' src='mute2.png' />"
            }
        }, false);
    } // end of runtime
}
