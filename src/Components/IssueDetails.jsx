import { Badge, Row, Button } from 'react-bootstrap';

const IssueDetails = ({ issue, goBack }) => {
  return (
    <Row className="align-content-center mt-5">
       <h3 className="text-center">Issue Details</h3>
       <p className="fs-4"><Badge className="me-3" bg="dark">Title</Badge>{issue.title}</p>
       <p className="fs-4"><Badge className="me-3" bg="dark">Labels</Badge>{issue.labels.join('\n')}</p>
       <p className="fs-4"><Badge className="me-3" bg="dark">Assignee</Badge>{issue.assignee?.login ?? "Not assigned"}</p>
       <p className="fs-4"><Badge className="me-3" bg="dark">Comments</Badge>{issue.comments}</p>
       <p className="fs-4"><Badge className="me-3" bg="dark">Status</Badge>{issue.state}</p>
       <p className="fs-4"><Badge className="me-3" bg="dark">Body</Badge></p>
       <div dangerouslySetInnerHTML={{__html: issue.body }}></div>
       <div className=" d-flex justify-content-center mt-5 mb-3">
         <Button className="w-50" variant="outline-dark" onClick={goBack}>Go back</Button>
       </div>
    </Row>
  );
};

export default IssueDetails;