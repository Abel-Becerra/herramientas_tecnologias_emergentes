import React, { Component } from 'react';

class Item extends Component {
  render() {
    return (
      <div className="row" style={{paddingBottom:5+'px'}}>
        <div className="col-6">
          <img src={'images/'+this.props.obj.image} style={{width:100+'%'}} alt={this.props.obj.name} title={this.props.obj.name}></img>
        </div>
        <div className="col-6">
          <div className="row col-12">
            <b>{this.props.obj.name}</b>
          </div>
          <div className="row col-12">
            <b>Unidades</b>:&nbsp;{this.props.obj.units}
          </div>
          <div className="row col-12">
            <b>Sub Total</b>:&nbsp;{this.props.obj.subtotal}
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
