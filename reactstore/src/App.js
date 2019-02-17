import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import IndexComponent from './components/IndexComponent';

class App extends Component {
  constructor(props) {
      super(props);
      this.onChangeUser = this.onChangeUser.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
          user: '',
          password: '',
          errors: [],
          redireccion:false
      }
  }
  onChangeUser(e) {
      this.setState({
          user: e.target.value
      });
  }
  onChangePassword(e) {
      this.setState({
          password: e.target.value
      });
  }
  onSubmit(e) {
      e.preventDefault();

      const errors = [];

      if (this.state.user.length === 0) {
        errors.push("El usuario es necesario ingresarlo");
      }

      if (this.state.password.length === 0) {
        errors.push("La contraseña es necesaria ingresarla");
      }

      this.setState({ errors:errors });
      if (errors.length > 0) {
        return;
      }

      const user = {
          user: this.state.user,
          password: this.state.password
      }
      axios.post('http://localhost:4200/serverrouter', user)
      .then(res => {
        console.log(res.data);
        if (res.data === "invalido"){
          errors.push("Error al iniciar sesión")
          this.setState({ errors: errors });
        }else{
          this.setState({ redireccion: true });
        }
      })
      .catch(res => console.log(res));
      this.setState({
          name: '',
          port: '',
          errors: []
      })
  }
  render() {
    if (this.state.redireccion === true || window.location.search.toString().indexOf("?refresh=1") > -1){
      return (<Router><IndexComponent/></Router>)
    }
    return (
    <Router>
        <form onSubmit={this.onSubmit} className="form-registration">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <div className="row col-12">
                <h1>Iniciar Sesión</h1>
              </div>
              <div className="row col-12">
                <label>Usuario:</label>
              </div>
              <div className="row col-12">
                <input type="text" id="user" placeholder="Usuario" name="user" value={this.state.user} className="form-control" onChange={this.onChangeUser} />
              </div>
              <div className="row col-12">
                <label>Contraseña:</label>
              </div>
              <div className="row col-12">
                <input type="password" id="password" placeholder="Contraseña" name="password" value={this.state.password} className="form-control" onChange={this.onChangePassword} />
              </div>
              <br/>
              <div className="row col-12 errores">
                {this.state.errors.map(error => (
                  <p key={error}>Error: {error}</p>
                ))}
              </div>
              <div className="row col-12">
                <input type="submit" value="Ingresar" className="btn btn-success"/>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </form>
      </Router>
    )
  }
}

export default App;

/*
if (this.state.redireccion === true){
  return (<Router><IndexComponent/></Router>)
}
return (
<Router>
    <form onSubmit={this.onSubmit} className="form-registration">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="row col-12">
            <h1>Iniciar Sesión</h1>
          </div>
          <div className="row col-12">
            <label>Usuario:</label>
          </div>
          <div className="row col-12">
            <input type="text" id="user" placeholder="Usuario" name="user" value={this.state.user} className="form-control" onChange={this.onChangeUser} />
          </div>
          <div className="row col-12">
            <label>Contraseña:</label>
          </div>
          <div className="row col-12">
            <input type="password" id="password" placeholder="Contraseña" name="password" value={this.state.password} className="form-control" onChange={this.onChangePassword} />
          </div>
          <br/>
          <div className="row col-12 errores">
            {this.state.errors.map(error => (
              <p key={error}>Error: {error}</p>
            ))}
          </div>
          <div className="row col-12">
            <input type="submit" value="Ingresar" className="btn btn-success"/>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </form>
  </Router>
)
*/
