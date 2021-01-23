import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getUserSkills } from "../../actions/profileAction";

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommend: [],
      error: null,
      loadong: true,
    };
  }
  componentWillMount() {
    const { skillsObject } = this.props.profile;
    if (skillsObject.id && skillsObject.skills) {
      let { skillsObject } = this.props.profile;
      if (skillsObject.id && JSON.parse(skillsObject.skills).length > 0) {
        let skills = JSON.parse(skillsObject.skills).join();
        if (this.state.recommend.length <= 0) {
          axios({
            method: "post",
            url: "/api/recommend",
            data: {
              skills: skills,
            },
          })
            .then((resp) => {
              if (resp && resp.data && resp.data.length > 0) {
                this.setState({
                  recommend: resp.data[0],
                });
              }
            })
            .catch((err) => {
              console.log(
                "🚀 ~ file: Jobs.js ~ line 40 ~ Jobs ~ componentDidUpdate ~ err",
                err
              );
            });
        }
      }
    } else {
      const { user } = this.props.auth;
      this.props.getUserSkills(user.id);
    }
  }
  componentDidUpdate(nextProps) {
    let { skillsObject } = this.props.profile;
    if (skillsObject.id && JSON.parse(skillsObject.skills).length > 0) {
      let skills = JSON.parse(skillsObject.skills).join();
      if (this.state.recommend.length <= 0) {
        axios({
          method: "post",
          url: "/api/recommend",
          data: {
            skills: skills,
          },
        })
          .then((resp) => {
            if (resp && resp.data && resp.data.length > 0) {
              this.setState({
                recommend: resp.data[0],
              });
            }
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: Jobs.js ~ line 40 ~ Jobs ~ componentDidUpdate ~ err",
              err
            );
          });
      }
    }
  }
  render() {
    let reccomendedJobTitles = [];
    let titleList;
    if (this.state.recommend.length > 0) {
      this.state.recommend.forEach((title, index) => {
        titleList = <li key={index}>{title}</li>;
        reccomendedJobTitles.push(titleList);
      });
    }

    return (
      <div>
        <ul>{reccomendedJobTitles}</ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserSkills })(Jobs);
