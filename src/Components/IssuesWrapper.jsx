import { Row, Col, Container } from "react-bootstrap";

const IssuesWrapper = ({ children }) => {
  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center">
        <Col className="col-12 shadow-lg rounded px-5" lg="8">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default IssuesWrapper;