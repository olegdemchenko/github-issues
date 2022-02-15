import { Row, Col, Card, ListGroup } from "react-bootstrap";

const renderIssue = ({ title, labels, assignee, comments, id }) => {
  return (
    <Col key={id}>
      <Card className="mb-4 btn btn-outline-dark" border="light">
        <h5 className="fw-bolder px-1 py-1">{title}</h5>
        <ListGroup className="rounded" variant="flush">
          <ListGroup.Item>{labels[0].description}</ListGroup.Item>
          <ListGroup.Item>{assignee ?? "Not assigned"}</ListGroup.Item>
          <ListGroup.Item>{comments} comments</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

const IssuesList = ({ issues }) => {
  return (
    <Row xs="1" md="2" xl="3" className="g-4 border-dark border-top">
      {issues.map((issue) => renderIssue(issue))}
    </Row>
  );
};

export default IssuesList;
