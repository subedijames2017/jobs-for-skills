import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getUserSkills, addSkills } from "../../actions/profileAction";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.handelSkillChange = this.handelSkillChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      skills: "",
      error: null,
    };
  }
  handelSkillChange(e) {
    this.setState({
      skills: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { isAuthenticated, user } = this.props.auth;
    const { skillsObject } = this.props.profile;
    let skillsId;
    if (skillsObject.id) {
      skillsId = skillsObject.id;
    }
    let skills = this.state.skills;
    skills = skills.split(",");
    this.props.addSkills(user.id, skills, skillsId, this.props.history);
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    this.props.getUserSkills(user.id);
  }
  componentDidUpdate(nextProps) {
    let { skillsObject } = this.props.profile;
    if (skillsObject.id) {
      if (
        nextProps.profile.skillsObject &&
        !nextProps.profile.skillsObject.id
      ) {
        let skills = "";
        if (skillsObject.skills) {
          skills = JSON.parse(skillsObject.skills);
        }
        this.setState({
          skills: skills,
        });
      }
    }
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div id="content" className="container-fluid">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              value=""
              value={this.state.skills}
              as="textarea"
              rows="2"
              placeholder="Enter Skills"
              onChange={this.handelSkillChange}
              required={true}
            />
            <Form.Text className="text-muted">
              Enter your coma seperated skills
            </Form.Text>
          </Form.Group>
          <Button variant="info" type="submit">
            Add skills
          </Button>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserSkills, addSkills })(Skills);
