var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
// var ConnectusConstants = require('');          // omg what is this even
var assign = require('react/lib/Object.assign');    // allows us to extend objects similarly to jquery and underscore lib...
var EventEmitter = require('events').EventEmitter;
var OutletServices = require('../services/OutletServices')

var CHANGE_EVENT = 'change';

var outletStore = assign({}, EventEmitter.prototype, {
  getOutlets: function() {
    return OutletServices.retrieve().then(function(outlets){
      console.log('outlets in the store: ', outlets)
      return outlets;
    })
  },

  getOutletById: function(id){
    return OutletServices.retrieve().then(function(outlets){
      outlets.forEach(function(outlet){
        if (parseInt(outlet.id) === parseInt(id)) {
          console.log('in the outlet store "if" with outlet: ', outlet,' looking for this id: ', id)
          return outlet
        }
      })
    })
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
    console.log('i changed')
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

});

ConnectusDispatcher.register(function(payload){
  var action = payload.action;
  switch(action){
    case 'CLICK_OUTLET':
      _outlets.map(function(outlet){
        if (outlet.id === payload.id){
          outlet.color = 'red';
          console.log('Im red');
          outletStore.emitChange();
          // trigger event!!
        }
      });
      break;
    default:
      return true;
  }
});

module.exports = outletStore;