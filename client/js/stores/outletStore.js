var ConnectusDispatcher = require('../dispatcher/ConnectusDispatcher');
var assign = require('react/lib/Object.assign');    // allows us to extend objects similarly to jquery and underscore lib...
var EventEmitter = require('events').EventEmitter;
var OutletServices = require('../services/outletServices');
var timeSlots = require('./data/timeSlots');
var Microevent = require('microevent');

var CHANGE_EVENT = 'change';

var outletStore = assign({}, EventEmitter.prototype, {
  validateAddress: function(data){
    return OutletServices.validateAddress(data).then(function(result){
      return result;
    });
  },
  
  setCurrentTransaction: function(data){
    return OutletServices.setTransaction(data).then(function(result){
      return result;
    });
  },
  getOutlets: function() {
    return OutletServices.retrieve().then(function(outlets){
      OutletServices.calculateOutletRating(outlets);
      return outlets;
    });
  },
  
  getSellerOutlets: function(){
    return OutletServices.retrieveOutletByUser().then(function(outlets){
      return outlets;
    });
  },
  
  getBuyerReservations: function(){
    return OutletServices.seeBuyerReservations().then(function(outletData){
      var transactions = {};
      var transactionsData = [];
      for(var i = 0; i < outletData.length; i++){
        var transactionId = outletData[i].transaction_id;
        if(!transactions[transactionId]){
          transactions[transactionId] = {};
          transactions[transactionId].id = transactionId;
          transactions[transactionId].paid = outletData[i].transaction_info.paid;
          transactions[transactionId].buyer_id = outletData[i].buyer_id;
          transactions[transactionId].seller_id = outletData[i].seller_id;
          transactions[transactionId].outlet = outletData[i].outlet_info;
          transactions[transactionId].seller = outletData[i].seller_info;
          transactions[transactionId].startTime = {slot: {number: outletData[i].slot_id, time: timeSlots[outletData[i].slot_id].start}, date: outletData[i].date};
          transactions[transactionId].endTime = {slot: {number: outletData[i].slot_id, time: timeSlots[outletData[i].slot_id].end}, date: outletData[i].date};
    
        }else{
          
          if(new Date(outletData[i].date).getDate() === new Date(transactions[transactionId].endTime.date).getDate() && outletData[i].slot_id > transactions[transactionId].endTime.slot.number){
            transactions[transactionId].endTime.slot = {number: outletData[i].slot_id, time: timeSlots[outletData[i].slot_id].end};
          }
          else if(new Date(outletData[i].date).getDate() > new Date(transactions[transactionId].endTime.date).getDate()){
            transactions[transactionId].endTime = {slot: {number: outletData[i].slot_id, time: timeSlots[outletData[i].slot_id].end}, date: outletData[i].date};
          }
        }
      }
      for(var key in transactions){
        transactionsData.push(transactions[key]);
      }
      return transactionsData;
    });
  },

  getOutletReservations: function(outletID){
    return OutletServices.retrieveOutletReservations(outletID).then(function(reservations){
      return reservations;
    });
  },

  getTimeSlotInfo: function(){
    return OutletServices.retrieveSlots().then(function(slots){
      return slots;
    });
  },

  getOutletById: function(id){
    return OutletServices.retrieve().then(function(outlets){
      var myOutlet = null;
      outlets.forEach(function(outlet){
        if (parseInt(outlet.id) === parseInt(id)) {
          myOutlet = outlet;
        }
      })
      return myOutlet;
    })
  },

  submitOutlet: function(newOutlet){
    return OutletServices.addOutlet(newOutlet);
  },

  editOutlet: function(newOutlet){
    return OutletServices.editOutlet(newOutlet);
  },

  submitReservation: function(newReservation) {
    return OutletServices.makeReservation(newReservation).then(function(reservation){
      
      // outletStore.trigger('change');
      return reservation;
    });
  },

  // createTransaction: function(){
  //   return OutletServices.makeTransaction();
  // },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }

});

ConnectusDispatcher.register(function(payload){
  Microevent.mixin(outletStore);
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