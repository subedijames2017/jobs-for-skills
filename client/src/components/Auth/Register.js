import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {registeruser} from "../../actions/authAction";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registeruser(newUser, this.props.history);
  }
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };
  componentWillReceiveProps = (nesxtProps) => {
    if (nesxtProps.errors) {
      this.setState({errors: nesxtProps.errors});
    }
  };

  render() {
    const {errors} = this.state;
    return (
      <React.Fragment>
        <section className="container-fluid">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="First Name"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Last Name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
                <p className="my-1">
                  Already have an account? <a href="/login">Sign </a>
                </p>
              </form>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
Register.propTypes = {
  //registeruser:PropTypes.function,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {registeruser})(withRouter(Register));
