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
      emptyResult: false,
    };
  }
  componentWillMount() {
    const {skillsObject} = this.props.profile;
    if (skillsObject.id && skillsObject.skills) {
      let {skillsObject} = this.props.profile;
      if (
        skillsObject.id &&
        JSON.parse(skillsObject.skills).length > 0 &&
        !this.state.emptyResult
      ) {
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
    if (
      skillsObject.id &&
      JSON.parse(skillsObject.skills).length > 0 &&
      !this.state.emptyResult
    ) {
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
            } else {
              this.setState({
                recommend: [],
                loadong: false,
                emptyResult: true,
              });
            }
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: Jobs.js ~ line 40 ~ Jobs ~ componentDidUpdate ~ err",
              err
            );
            this.setState({
              recommend: [],
              loadong: false,
              emptyResult: true,
            });
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
        let description = vacency.description;
        description = JSON.parse(description);
        reccomendedJobs.push(
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={2}>
                    <img variant="top" src={vacency.avatar} />
                  </Col>
                  <Col sm={10}>
                    <a href={vacency.link} target="_blank" className="job_link">
                      <Card.Title>{vacency.title}</Card.Title>
                    </a>
                    <Row>
                      <Col>
                        <Card.Text>
                          Company: {description.companyName}
                        </Card.Text>
                        <Card.Text>Location: {description.location}</Card.Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        );
      });
    }
    if (this.state.emptyResult) {
      reccomendedJobs.push(
        <Col>
          <Row className="d-flex justify-content-center">
            <i className="fa fa-home" aria-hidden="true"></i>{" "}
            <p>No vacencies now for your skills</p>
          </Row>
        </Col>
      );
    }

    return (
      <div className="container-fluid">
        {spinnerContent}
        <Row>{reccomendedJobs}</Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {getUserSkills})(Jobs);
