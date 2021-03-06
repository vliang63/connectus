var request = require('reqwest');
var when = require('when'); //promises
var AuthConstants = require('../constants/authConstants.js');

var authService = function(){
  var authInstance = {};
  //sends request to the back end to end the Express session and clear cookies
  authInstance.logout = function(){
    return request({
      url: AuthConstants.LOGOUT,
      method: 'GET',
      crossOrigin: true,
      success: function(){
        document.location ='/';
      }
    })
    //after backend session is cleared, reset the cookie on the front end
    .then(function(){
      document.cookie='';
    });
  };
  return authInstance;
};


module.exports = authService();
