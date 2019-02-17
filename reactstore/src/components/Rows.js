import React, { Component } from 'react';

class Rows extends Component {
  render() {
    return (
      <div id={this.props.obj.name.toString().toLowerCase()} className="card" style={{width: 22+'rem',marginBottom: 3+'vh',marginRight: 3+'vh'}}>
        <img className="card-img-top" src={'images/'+this.props.obj.image} alt={this.props.obj.name} title={this.props.obj.name}></img>
        <div className="card-body">
          <h5 className="card-title"><span className="itemName">{this.props.obj.name}</span></h5>
          <div className="card-text">
            <div className="row col-12">
              <b>Precio: </b>&nbsp; <span className="itemPrice">{this.props.obj.price}</span>
            </div>
            <div className="row col-12">
              <b>Unidades: </b>&nbsp; <span className="itemUnits">{this.props.obj.units}</span>
            </div>
            <div className="row">
              <div className="col-4">
                <button type="button" style={{width:100+'%'}} className="btn btn-primary" onClick={() => this.props.handleShow(this.props.obj)} title="Ver Mas"><span className="fa fa-info"></span></button>
              </div>
              <div className="col-3">
                <button type="button" className="btn btn-secondary shopping-cart" onClick={() => this.props.handleAddCart(this, this.props.obj)} title="Añadir"><span className="fa fa-cart-plus"></span></button>
              </div>
              <div className="col-5">
                <input type="number" className="form-control text-center" data-qty={this.props.obj.name} defaultValue="0" min="0" step="1" max={this.props.obj.units}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rows;
