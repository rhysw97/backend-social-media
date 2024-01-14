"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//register
var Mongoose = require('mongoose');

var Schema = Mongoose.Schema,
    model = Mongoose.model;

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);

    this.userSchema = new Schema({
      id: String,
      email: String,
      username: String,
      dateOfBirth: String,
      age: Number,
      password: String,
      profilePicture: String,
      about: String,
      genres: Array,
      interestedGigs: Array,
      postHistory: Array,
      friendslist: Array
    });
    this.user = model('users', this.userSchema);
  }

  _createClass(User, [{
    key: "addNewUser",
    value: function addNewUser(userData) {
      var newUser, doesUserExist;
      return regeneratorRuntime.async(function addNewUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newUser = {
                email: userData.email,
                username: userData.username,
                dateOfBirth: userData.dateOfBirth,
                age: userData.age,
                password: userData.password,
                profilePicture: '',
                about: '',
                genres: [],
                interestedGigs: [],
                postHistory: [],
                friendslist: [],
                artists: []
              };
              _context.next = 3;
              return regeneratorRuntime.awrap(this.checkDataIsInDatabase({
                email: newUser.email
              }));

            case 3:
              _context.t0 = _context.sent;
              _context.next = 6;
              return regeneratorRuntime.awrap(this.checkDataIsInDatabase({
                username: newUser.username
              }));

            case 6:
              _context.t1 = _context.sent;
              doesUserExist = {
                email: _context.t0,
                username: _context.t1
              };

              if (!doesUserExist.email && !doesUserExist.username) {
                this.user.create(newUser)["catch"](function (err) {
                  console.log("Error: " + err);
                });
              }

              return _context.abrupt("return", doesUserExist);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "checkDataIsInDatabase",
    value: function checkDataIsInDatabase(data) {
      var isInDatabase;
      return regeneratorRuntime.async(function checkDataIsInDatabase$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.user.findOne(data));

            case 2:
              isInDatabase = _context2.sent;
              console.log('hey', isInDatabase);

              if (!isInDatabase) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", true);

            case 8:
              return _context2.abrupt("return", false);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "checkLoginDetails",
    value: function checkLoginDetails(data) {
      var userData;
      return regeneratorRuntime.async(function checkLoginDetails$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.user.findOne({
                email: data.email
              }));

            case 2:
              userData = _context3.sent;

              if (!userData) {
                _context3.next = 6;
                break;
              }

              if (!(userData.password === data.password)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", {
                accepted: true,
                username: userData.username
              });

            case 6:
              return _context3.abrupt("return", {
                accepted: false,
                username: ''
              });

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateProfile",
    value: function updateProfile(data) {
      var userData;
      return regeneratorRuntime.async(function updateProfile$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.user.findOneAndUpdate({
                username: data.username
              }));

            case 2:
              userData = _context4.sent;

              if (userData) {
                userData.profilePicture = data.profilePicture;
                userData.about = data.about;
                userData.genres = data.genres;
                userData.interestedGigs = data.interestedGigs;
                userData.artists = data.artists;
              }

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getProfileData",
    value: function getProfileData(username, response) {
      var userData;
      return regeneratorRuntime.async(function getProfileData$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.user.findOne({
                username: username
              }));

            case 2:
              userData = _context5.sent;
              console.log(userData);

              if (userData) {
                response.send(userData);
              }

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getProfilePicture",
    value: function getProfilePicture(username, response) {
      var userData;
      return regeneratorRuntime.async(function getProfilePicture$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.user.findOne({
                username: username
              }));

            case 2:
              userData = _context6.sent;

              if (userData) {
                response.send(userData.profilePicture);
              }

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updatePassword",
    value: function updatePassword(username, password) {
      var user;
      return regeneratorRuntime.async(function updatePassword$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              console.log(password);
              _context7.next = 3;
              return regeneratorRuntime.awrap(this.user.findOneAndUpdate({
                name: username
              }, {
                $set: {
                  password: password
                }
              }, {
                "new": true
              }));

            case 3:
              user = _context7.sent;
              console.log(user);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "returnProfilePicture",
    value: function returnProfilePicture(username) {
      var userData;
      return regeneratorRuntime.async(function returnProfilePicture$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.user.findOne({
                username: username
              }));

            case 2:
              userData = _context8.sent;

              if (!userData) {
                _context8.next = 5;
                break;
              }

              return _context8.abrupt("return", userData.profilePicture);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }]);

  return User;
}();

module.exports = {
  User: User
};