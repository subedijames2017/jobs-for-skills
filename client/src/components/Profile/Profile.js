import React, { Component } from "react";
import { getUserSkills } from "../../actions/profileAction";
import { connect } from "react-redux";

class Profile extends Component {
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    this.props.getUserSkills(user.id);
  }
  render() {
    return <div>Your profle will be here</div>;
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserSkills })(Profile);
