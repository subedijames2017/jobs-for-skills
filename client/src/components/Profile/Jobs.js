import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserSkills } from "../../actions/profileAction";

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: "",
      error: null,
    };
  }
  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    this.props.getUserSkills(user.id);
  }
  render() {
    return <div>Your jobs goes here</div>;
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserSkills })(Jobs);
