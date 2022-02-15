import { Badge, Row, Button } from 'react-bootstrap';

const IssueDetails = () => {
  return (
    <Row className="align-content-center mt-5">
       <h3 className="text-center">Issue Details</h3>
       <p className="fs-4"><Badge className="me-3" bg="dark">Title</Badge>Title</p>
       <p className="fs-4"><Badge className="me-3" bg="dark">Labels</Badge>Labels</p>
       <p className="fs-4"><Badge className="me-3" bg="dark">Assignee</Badge>Assignee</p>
       <p className="fs-4"><Badge className="me-3" bg="dark">Comments</Badge>10000</p>
       <p className="fs-4"><Badge className="me-3" bg="dark">Body</Badge></p>
       <div></div>
       <div className=" d-flex justify-content-center my-3">
         <Button className="w-50" variant="outline-dark">Go back</Button>
       </div>
    </Row>
  );
};

export default IssueDetails;