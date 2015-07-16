var React = require('react');
var outletStore = require('../stores/outletStore');

/* TODO
Style page
Change state and voltage to dropdown

*/

var addOutlet = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var newOutlet = {
      address: React.findDOMNode(this.refs.street).value.trim() + ';' + React.findDOMNode(this.refs.city).value.trim() + ';' +  React.findDOMNode(this.refs.state).value.trim() + ';' + React.findDOMNode(this.refs.zip).value.trim(),
      name: React.findDOMNode(this.refs.name).value.trim(),
      description: React.findDOMNode(this.refs.description).value.trim(),
      voltage: React.findDOMNode(this.refs.voltage).value.trim(),
      charge: React.findDOMNode(this.refs.charge).value.trim()
    };

    console.log(newOutlet);
    // if (!text || !author) {
    //   return;
    // }
    outletStore.submitOutlet(newOutlet).then(function(res){
      console.log('ADDOUTLET submit response: ', res)
    });
    
    React.findDOMNode(this.refs.street).value = '';
    React.findDOMNode(this.refs.city).value = '';
    React.findDOMNode(this.refs.state).value = '';
    React.findDOMNode(this.refs.zip).value = '';
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.description).value = '';
    React.findDOMNode(this.refs.voltage).value = '';
    React.findDOMNode(this.refs.charge).value = '';
    console.log('submitted!')
    return;
  },
  render: function(){
    // var value = this.state.value;
    return (
      <div className="addoutlet ui container center">
        <form className="ui form" onSubmit={this.handleSubmit}>
          Street <input type="text" ref="street" placeholder='Enter your street address...' /><br />
          City <input type="text" ref="city" placeholder='Enter city...' /> <br />
          State <input type="text" ref="state" placeholder='Enter state...' /><br />
          Zip-code <input type="text" ref="zip" placeholder='Enter zip-code...' /><br />
          Name <input type="text" ref="name" placeholder='What do you want to call this outlet?' /><br />
          Description <textarea name="description" ref="description" placeholder="This is a description." /><br />
          <div className="field">
            <label>Voltage</label>
            <select class="ui dropdown">
              <option value="1">Standard</option>
              <option value="0">High</option>
            </select><br />
          </div>
          Your hourly rate: $3/hr   Suggested price/kWh: $10/kWh<br />
          Your price/kWh charge: $<input type="text" ref="charge" placeholder='10' />/kWh<br />
          <button className="ui button" type="submit" value="Post">Submit</button><br />
        </form>
      </div>
    )
  }
});

module.exports = addOutlet;

// <select className="select" onChange={this.selectLog}>
//           <option value='AK'>AK</option>
//           <option value='CA'>CA</option>
//         </select>