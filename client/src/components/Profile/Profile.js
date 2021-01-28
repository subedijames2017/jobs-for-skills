import React, { Component } from "react";
import { getUserSkills } from "../../actions/profileAction";
import { connect } from "react-redux";

class Profile extends Component {
  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(
      "🚀 ~ file: Profile.js ~ line 8 ~ Profile ~ componentDidMount ~ user",
      user
    );
    this.props.getUserSkills(user.id);
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { skillsObject } = this.props.profile;
    console.log(
      "🚀 ~ file: Profile.js ~ line 17 ~ Profile ~ render ~ skillsObject",
      skillsObject
    );
    let skillsArray = [];
    if (skillsObject && skillsObject.skills) {
      JSON.parse(skillsObject.skills).forEach((element) => {
        skillsArray.push(
          <div className="p-1">
            <i className="fas fa-check" /> {element}
          </div>
        );
      });
    }

    return (
      <div className="container">
        <div className="profile-grid my-1">
          <div className="profile-top badge-info">
            <img
              src="https://ui-avatars.com/api/?name=james&size=128"
              alt=""
              className="round-img my-1"
            />
            <h1 className="large">
              {user.firstName} {user.lastName}
            </h1>
          </div>
          {skillsArray.length > 0 && (
            <div className="profile-about bg-light">
              <div className="line" />
              <h2 className="text-info">Skill Set</h2>
              <div className="skills">{skillsArray}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserSkills })(Profile);
