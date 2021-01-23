import React, { Component } from "react";
import axios from "axios";
import { Form, Button, ListGroup } from "react-bootstrap";

class Landingpage extends Component {
  constructor(props) {
    super(props);
    this.handelSkillChange = this.handelSkillChange.bind(this);
    this.handleRecommendJobs = this.handleRecommendJobs.bind(this);

    this.state = {
      skills: "",
      job: null,
    };
  }
  handelSkillChange(e) {
    this.setState({
      skills: e.target.value,
    });
  }
  handleRecommendJobs(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "/api/job",
      data: {
        skills: this.state.skills,
      },
    }).then((resp) => {
      if (resp && resp.data && resp.data.length > 0) {
        this.setState({
          job: resp.data[0][0],
          skills: "",
        });
      }
    });
  }
  render() {
    let handleRecommendJobs = this.handleRecommendJobs;
    return (
      <React.Fragment>
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
              />
              <Form.Text className="text-muted">
                Enter your coma seperated skills
              </Form.Text>
            </Form.Group>
            <Button variant="info" type="submit">
              Recommend job
            </Button>
          </Form>
          {this.state.job && (
            <div className="mt-4">
              <p>Recommended Job</p>
              <ListGroup>
                <ListGroup.Item action variant="info">
                  {this.state.job}
                </ListGroup.Item>
              </ListGroup>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default Landingpage;
