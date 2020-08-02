import React, { Component } from "react";
import axios from "axios";
import { Form, Button, ListGroup } from "react-bootstrap";

class Landingpage extends Component {
  constructor(props) {
    super(props);
    this.handelSkillChange = this.handelSkillChange.bind(this);
    this.handleRecommendJobs = this.handleRecommendJobs.bind(this);

    this.state = {
      skills: null,
      job: null,
    };
  }
  handelSkillChange(e) {
    console.log("This code is runing");
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
        firstName: "Fred",
        lastName: "Flintstone",
      },
    }).then((resp) => {
      console.log("Landingpage -> componentDidMount -> resp", resp);
    });
  }
  render() {
    let handleRecommendJobs = this.handleRecommendJobs;
    return (
      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button type="button" id="sidebarCollapse" className="btn btn-info">
              <i className="fas fa-align-left" />
              <span>&ensp;Explore</span>
            </button>
            <button
              className="btn btn-dark d-inline-block d-lg-none ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-align-justify" />
            </button>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active"
                id="nav-home-tab"
                data-toggle="tab"
                href="#nav-home"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Recommend
              </a>
              <a
                className="nav-item nav-link"
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-profile"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Jobs
              </a>
            </div>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <Form onSubmit={handleRecommendJobs}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter skills you have</Form.Label>
                <Form.Control
                  type="text"
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
            <div className="mt-4">
              <ListGroup>
                <ListGroup.Item action variant="info">
                  Info
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            Job lists goes here
          </div>
        </div>
      </div>
    );
  }
}
export default Landingpage;
