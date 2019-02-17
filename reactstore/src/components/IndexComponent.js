import React from 'react';
import axios from 'axios';
import Rows from './Rows';
import Modal from 'react-bootstrap/Modal'
import ItemCar from './Cart';

export default class IndexComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        products: [],
        showItems:0,
        perpage:8,
        page:1,
        pages:0,
        wishlist:[],
        show: false,
        itemDetail: {},
        showCart: false,
        total:0
      };
      this.logout = this.logout.bind(this)
      this.handleShowMore = this.handleShowMore.bind(this)
      this.handleShowLess = this.handleShowLess.bind(this)
      this.handleAddCart = this.handleAddCart.bind(this)
      this.handleShow = this.handleShow.bind(this)
      this.handleShowCatalog = this.handleShowCatalog.bind(this)
      this.handleShowFilter = this.handleShowFilter.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.closeCart = this.closeCart.bind(this)
      this.viewCart = this.viewCart.bind(this)
    }
    componentDidMount(){
      axios.get('http://localhost:4200/serverrouter/productos')
      .then(response => {
        this.setState({ products: response.data,
          pages: Math.ceil(response.data.length / 8)});
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    componentWillMount(){
      document.body.className="main";
    }
    logout(){
      window.location.href = "/"
    }
    handleShowMore() {
      let pagers = document.querySelectorAll(".pager")
      let actual = this.state.page
      this.setState({page:actual+1})
      if(actual >= this.state.pages){
        actual = (this.state.pages - 1)
        this.setState({page:this.state.pages})
      }
      for (var l in pagers ){
        if(pagers[l].innerHTML === actual.toString()){
          pagers[l].parentNode.classList.remove("visible")
          break;
        }
      }
      for (var q in pagers ){
        if(pagers[q].innerHTML === (actual + 1).toString()){
          pagers[q].parentNode.classList.add("visible")
          break;
        }
      }
    }
    handleShowLess() {
      let pagers = document.querySelectorAll(".pager")
      let actual = this.state.page
      this.setState({page:actual-1})
      if(actual <= 1){
        actual = 2
        this.setState({page:1})
      }
      for (var u in pagers ){
        if(pagers[u].innerHTML === actual.toString()){
          pagers[u].parentNode.classList.remove("visible")
          break;
        }
      }
      for (var t in pagers ){
        if(pagers[t].innerHTML === (actual - 1).toString()){
          pagers[t].parentNode.classList.add("visible")
          break;
        }
      }
    }
    handleAddCart(htmlelement, obj){
      let pagers = document.querySelectorAll(".buyed")
      let qty = document.querySelectorAll("[data-qty='" + obj.name + "']")[0].valueAsNumber
      pagers[0].innerHTML = ""
      pagers[0].classList.remove("sub")

      this.state.wishlist.push({objeto:obj, qty:qty})
      var totalizando = this.state.total + (qty * parseFloat(obj.price.replace("$","")))
      this.setState({total:totalizando})

      if (this.state.wishlist.length > 0){
        pagers[0].innerHTML = this.state.wishlist.length
        pagers[0].classList.add("sub")
      }
    }
    tabRow() {
      let items = [], cards = [];
      let start = 0, end = this.state.perpage;

      for(let j = 1; j <= this.state.pages; j++) {
        let me = this
        cards = this.state.products.slice(start, end).map(function(object, i) {
        return (
          <div className="col-3">
            <Rows obj={object} key={(i+j)} handleAddCart={me.handleAddCart} handleShow={me.handleShow} />
          </div>
          );
        });
        if (j === 1){
          items.push(<div className="oculto visible"><span className="pager oculto">{j}</span><div className="row">{cards}</div></div>);
        } else {
          items.push(<div className="oculto"><span className="pager oculto">{j}</span><div className="row">{cards}</div></div>);
        }
        start = (this.state.perpage * (j))
        end = (this.state.perpage * (j + 1))
      }

      return (
        <div>
          {items}
        </div>
      );
    }
    handleShow(obj) {
      this.setState({ show: true, itemDetail:obj });
    }
    handleClose() {
      this.setState({ show: false });
    }
    viewCart() {
      this.setState({ showCart: true });
    }
    closeCart() {
      this.setState({ showCart: false });
    }
    cart() {
      var items = []
      var total = 0
      for (var k in this.state.wishlist) {
        var subtotal = this.state.wishlist[k].qty * parseFloat(this.state.wishlist[k].objeto.price.replace("$", ""))
        total = total + subtotal
        var item = {
          name : this.state.wishlist[k].objeto.name,
          image : this.state.wishlist[k].objeto.image,
          units : this.state.wishlist[k].qty,
          subtotal : subtotal
        }
        items.push(item)
      }

      return (
        items.map(function(object,i){
          return <ItemCar obj={object} key={i}/>
        })
      );
    }
    handleShowCatalog() {
      let filtering = document.querySelectorAll(".filtering")
      let catalog = document.querySelectorAll(".catalog")
      let busqueda = document.querySelectorAll(".busqueda")
      busqueda[0].value = ""
      catalog[0].classList.add("visible")
      filtering[0].classList.remove("visible")
    }
    handleShowFilter() {
      let filtering = document.querySelectorAll(".filtering")
      let catalog = document.querySelectorAll(".catalog")
      let busqueda = document.querySelectorAll(".busqueda")
      catalog[0].classList.remove("visible")
      filtering[0].classList.add("visible")

      var esconder = document.querySelectorAll("div.filtering  div.visible")
      if (esconder.length > 0){
          for(var k in esconder){
            try{ esconder[k].classList.remove("visible"); } catch(il) {}
          }
      }

      var items = this.state.products.filter(function(item){
        return item.name.toString().toLowerCase().indexOf(busqueda[0].value.toString().toLowerCase()) > -1;
      }).map(function(obj, i){
        return obj
      })

      for(var w in items){
        var filtro = "div.filtering  div[id='" + items[w].name.toString().toLowerCase() + "']"
        document.querySelectorAll(filtro)[0].parentNode.classList.add("visible")
      }
    }
    filter(){
      var me = this
      return this.state.products.map((obj, i) => {
        return <div className="col-4 oculto"><Rows obj={obj} key={i} handleAddCart={me.handleAddCart} handleShow={me.handleShow} /></div>
      })
    }
    pagar(items){
      var exito = false
      var wishesFailed = []
      for(let t in items) {
        let units = items[t].objeto.units - items[t].qty
        axios.post('http://localhost:4200/serverrouter/pagar', {_id:items[t].objeto._id,units:units,name:items[t].objeto.name},
        {headers: { 'content-type': 'application/json' }})
        .then(res => {
          console.log(res);
          if (res.status === 200){
            exito = true
          } else {
            exito = false
            wishesFailed.push(res.data.name)
            console.log("Se presento un error, por lo cual no fue posible realiar el pago")
          }
        }).catch(res => {
          wishesFailed.push(res.data.name)
          console.log(res);
          exito = false
          console.log("Se presento un error, por lo cual no fue posible realiar el pago");
        });
      }

      setTimeout(function(){
        if (exito){
            window.location.href = "?refresh=1"
        } else {
          console.log('No todos los productos fueron pagados, elementos no pagados ' + wishesFailed.join())
        }
      }, 500)
    }
    render() {
      return (
        <div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10 bannerTop">
            <div className="row">
              <div className="col-8">
                <h3>Mi Tiendita Patito</h3>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="btn btn-group" style={{marginTop:-10,right:-40+'%'}}>
                    <button type="button" className="btn btn-default" style={{border:'none'}} onClick={this.handleShowCatalog}><span className="fa fa-table"></span></button>
                    <button type="button" className="btn btn-default" style={{border:'none'}} onClick={this.viewCart}><span className="fa fa-shopping-cart"><sub className="buyed"></sub></span></button>
                    <button type="button" className="btn btn-default" style={{border:'none'}}><span className="fa fa-inbox"></span></button>
                    <button type="button" className="btn btn-default" style={{border:'none'}} onClick={this.logout}><span className="fa fa-sign-out-alt"></span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10" style={{padding:0,marginTop:2+'vh'}}>
              <div className="card" style={{opacity:0.9}}>
                <div className="row" style={{paddingLeft:1+'vw',paddingTop:5+'vh',paddingRight:1+'vw'}}>
                  <div className="col-7">
                    <h5 className="card-title">Catálogo de Productos</h5>
                  </div>
                  <div className="col-5">
                    <input type="text" className="form-control busqueda" onChange={this.handleShowFilter} placeholder="Busqueda de productos" />
                  </div>
                </div>
                <div className="card-body">
                  <div className="catalog oculto visible">
                    <div>{this.tabRow()}</div>
                    <div onClick={this.handleShowLess} className="pagerleft"><i className="fas pagerimg fa-arrow-alt-circle-left"></i></div>
                    <div onClick={this.handleShowMore} className="pagerright"><i className="fas pagerimg fa-arrow-alt-circle-right"></i></div>
                  </div>
                  <div className="filtering oculto">
                    <div className="row">{this.filter()}</div>
                  </div>
                </div>
              </div>
          </div>
          <div className="col-1"></div>
        </div>
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{fontSize:60+'px'}}>{this.state.itemDetail.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-8">
                <img src={'images/'+this.state.itemDetail.image} style={{width:90+'%'}} alt={this.state.itemDetail.name} title={this.state.itemDetail.name}></img>
              </div>
              <div className="col-4">
                <div className="row col-12" style={{fontSize:40+'px'}}>
                  <b>Precio: </b>
                </div>
                <br/>
                <div className="row col-12" style={{fontSize:40+'px'}}>
                  <span>{this.state.itemDetail.price}</span>
                </div>
                <div className="row col-12" style={{fontSize:40+'px'}}>
                  <b>Unidades: </b>
                </div>
                <div className="row col-12" style={{fontSize:40+'px'}}>
                  <span>{this.state.itemDetail.units}</span>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.showCart} onHide={this.closeCart}>
          <Modal.Header closeButton>
            <Modal.Title>Carrito de Compras</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-8">
                {this.cart()}
              </div>
              <div className="col-4">
                <div className="row col-12">
                  <b>Total: $ <span>{this.state.total}</span></b>
                </div>
                <br/>
                <div className="row col-12">
                  <input type="button" value="Cancelar" className="btn btn-secondary" onClick={this.closeCart}/>&nbsp;
                  <input type="button" value="Pagar" className="btn btn-success" onClick={()=> this.pagar(this.state.wishlist)}/>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        </div>
      );
    }
  }

  /*
  Falta:
  8. Al hacer click en el botón Pagar, se debe regresar al catálogo, y se debe vaciar el carrito de compras, actualizando las unidades
    disponibles de cada producto en la base de datos, restándole las unidades del pedido pagado.
  */
