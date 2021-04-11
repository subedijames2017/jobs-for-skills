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
      if (resp && resp.data.data && resp.data.data.length > 0) {
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
