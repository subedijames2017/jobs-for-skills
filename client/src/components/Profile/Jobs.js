import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {getUserSkills} from "../../actions/profileAction";
import {Spinner, Card, Container, Row, Col} from "react-bootstrap";

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
    const {skillsObject} = this.props.profile;
    if (skillsObject.id && skillsObject.skills) {
      let {skillsObject} = this.props.profile;
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
              console.log(
                "🚀 ~ file: Jobs.js ~ line 30 ~ Jobs ~ .then ~ resp",
                resp
              );
              if (resp && resp.data.data && resp.data.data.length > 0) {
                this.setState({
                  recommend: resp.data.data,
                  loadong: false,
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
      const {user} = this.props.auth;
      this.props.getUserSkills(user.id);
    }
  }
  componentDidUpdate(nextProps) {
    let {skillsObject} = this.props.profile;
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
            console.log(
              "🚀 ~ file: Jobs.js ~ line 66 ~ Jobs ~ .then ~ resp",
              resp
            );
            if (resp && resp.data.data && resp.data.data.length > 0) {
              this.setState({
                recommend: resp.data.data,
                loadong: false,
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
    let spinnerContent = [];
    let reccomendedJobs = [];
    if (this.state.loadong) {
      console.log("inside here");
      spinnerContent.push(
        <Spinner
          className="spinner"
          animation="border"
          variant="info"
          size="lg"
        />
      );
    }
    if (this.state.recommend.length > 0) {
      this.state.recommend.forEach((vacency, index) => {
        reccomendedJobs.push(
          <Col sm={3}>
            <Card style={{width: "18rem"}}>
              <Card.Body>
                <Card.Title>{vacency.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        );
      });
    }

    return (
      <div>
        {spinnerContent}
        <Container className="jobs">
          <Row>{reccomendedJobs}</Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {getUserSkills})(Jobs);
