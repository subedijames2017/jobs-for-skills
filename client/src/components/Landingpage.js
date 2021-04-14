import React, {Component} from "react";
import axios from "axios";
import {
  Form,
  Button,
  ListGroup,
  Spinner,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

class Landingpage extends Component {
  constructor(props) {
    super(props);
    this.handelSkillChange = this.handelSkillChange.bind(this);
    this.handleRecommendJobs = this.handleRecommendJobs.bind(this);

    this.state = {
      skills: "",
      jobs: [],
      loading: false,
      emptyResult: false,
    };
  }
  handelSkillChange(e) {
    this.setState({
      skills: e.target.value,
    });
  }
  handleRecommendJobs(e) {
    this.setState({
      loading: true,
    });
    e.preventDefault();
    axios({
      method: "post",
      url: "/api/recommend",
      data: {
        skills: this.state.skills,
      },
    }).then((resp) => {
      if (
        resp &&
        resp.data.data &&
        resp.data.data.length > 0 &&
        !this.state.emptyResult
      ) {
        this.setState({
          jobs: resp.data.data,
          skills: "",
          loading: false,
        });
      }
    });
  }
  render() {
    let handleRecommendJobs = this.handleRecommendJobs;
    let spinnerContent = [];
    let reccomendedJobs = [];
    if (this.state.loading) {
      spinnerContent.push(
        <Spinner
          className="spinner"
          animation="border"
          variant="info"
          size="lg"
        />
      );
    }
    if (this.state.jobs.length > 0) {
      this.state.jobs.forEach((vacency, index) => {
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
      <React.Fragment>
        {spinnerContent}
        <div id="content" className="container-fluid">
          <Form onSubmit={handleRecommendJobs}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter skills you have</Form.Label>
              <Form.Control
                value={this.state.skills}
                as="textarea"
                rows="3"
                placeholder="Enter Skills"
                onChange={this.handelSkillChange}
                required
              />
              <Form.Text className="text-muted">
                Enter your coma seperated skills
              </Form.Text>
            </Form.Group>
            <Button variant="info" type="submit">
              Recommend job
            </Button>
          </Form>
          <Container className="jobs">
            <Row>{reccomendedJobs}</Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
export default Landingpage;
