import { Row, Col, Card, ListGroup } from "react-bootstrap";

const IssuesList = ({ issues, showDetails }) => {
  //TODO Implement pagination
  const renderIssue = (issue) => {
    return (
      <Col key={issue.id} onClick={() => showDetails(issue)}>
        <Card className="mb-4 btn btn-outline-dark" border="light">
          <h5 className="fw-bolder px-1 py-1">{issue.title}</h5>
          <ListGroup className="rounded" variant="flush">
            <ListGroup.Item>{issue.labels.join("\n")}</ListGroup.Item>
            <ListGroup.Item>
              {issue.assignee?.login ?? "Not assigned"}
            </ListGroup.Item>
            <ListGroup.Item>{issue.comments} comments</ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    );
  };

  return (
    <Row xs="1" md="2" xl="3" className="g-4 border-dark border-top">
      {issues.map((issue) => renderIssue(issue))}
    </Row>
  );
};

export default IssuesList;
