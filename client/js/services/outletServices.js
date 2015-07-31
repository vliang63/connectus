var request = require('reqwest');
var when = require('when'); //promises
var OutletListConstants = require('../constants/OutletListConstants.js');

var outletServices = function(){

  var outletData = {};

  outletData.validateAddress = function(data){
    return request({
      url: OutletListConstants.VALIDATE_ADDRESS,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(result){
        console.log('validatedAddress: coordinates are:', result);
        return result;
      }
      
    });
  };

  outletData.setTransaction = function(data){
    return request({
      url: OutletListConstants.TRANSACTION_CURRENT,
      method: 'POST',
      crossOrigin:true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(result){
        console.log('settingtransaction was successful', result);
        return result;
      }
    });
  };

  outletData.getLocation = function(lat, long){
    navigator.geolocation.getCurrentPosition(function(position) {
     lat = position.coords.latitude;
     long = position.coords.longitude;
    });
  };

  outletData.retrieve = function(){
    return request({
      url: OutletListConstants.OUTLET_DATA,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      success: function(outlets) {
        return outlets;
      }
    });
  };

  outletData.calculateOutletRating = function(outlets) {
    outlets.map(function(outlet){
      if (outlet.thumbs_up + outlet.thumbs_down < 10) {
        outlet.rating = 'no rating availabile';
      } else {
        outlet.rating = Math.floor((100/(outlet.thumbs_up + outlet.thumbs_down)) * outlet.thumbs_up) + "% buyer approval"
      }
    })
  };

  outletData.retrieveOutletByUser = function(){
    return request({
      url: OutletListConstants.OUTLETS_BYUSER,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      success: function(outlets){
        console.log(outlets);
        return outlets;
      }
    });
  };

  outletData.retrieveOutletReservations = function(outletID){
    return request({
      url: OutletListConstants.OUTLET_RESERVATIONS,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify({outletID: outletID}),
      success: function(reservations){
        return reservations;
      }
    });
  };

  outletData.retrieveSlots = function(){
    return request({
      url: OutletListConstants.TIME_SLOTS,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      success: function(slots){
        return slots;
      }
    });
  };

  outletData.retrieveOutletById = function(outletID){
    return request({
      url: OutletListConstants.OUTLET_DATA,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      success: function(outlets) {
        return outlets;
      }
    });
  };

  outletData.addOutlet = function(newOutlet){
    return request({
      url: OutletListConstants.ADD_OUTLET,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(newOutlet),
      success: function(res) {
        console.log(res);
      }
    });
  };

  outletData.editOutlet = function(newOutlet){
    return request({
      url: OutletListConstants.EDIT_OUTLET,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(newOutlet),
      success: function(res) {
        console.log(res);
      }
    });
  }

  outletData.makeReservation = function(newReservation){
    return request({
      url: OutletListConstants.MAKE_RESERVATION,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(newReservation),
      success: function(res) {
        return res;
      }
      // error: function(res){
      //   console.
      // }
    });
  };

  outletData.seeBuyerReservations = function(){
    return request({
      url: OutletListConstants.SEEBUYER_RESERVATIONS,
      method: 'GET',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      error: function(res) {
        console.log('error----------------------->', res);
      },
      success: function(reservations) {
        return reservations;
      }
    });
  };

  outletData.turnOutletOn = function(transaction){
    return request({
      url: OutletListConstants.TURNON_OUTLET,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(transaction),
      success: function(res) {
        console.log('---------------------------------> SUCCESS, reservation info sent to server.');
        console.dir(res);
      }
    });
  }

  outletData.turnOutletOff = function(transaction){
    return request({
      url: OutletListConstants.TURNOFF_OUTLET,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify(transaction),
      success: function(res) {
        console.log('---------------------------------> SUCCESS, transaction info sent to server.');
        console.dir(res);
      }
    });
  }

  // outletData.turnOff = function(){
  //   return request({
  //     url: '/turnOff',
  //     method: 'POST',
  //     crossOrigin: true,
  //     type: 'json',
  //     success: function(res){
  //       console.log('SUCCESS TURNOFF: ', res)
  //     }
  //   });
  // };

  return outletData;
  
};

module.exports = outletServices();