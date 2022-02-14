import {
  Row, 
  Col,
  Container,
} from 'react-bootstrap';

import FilteringCriteria from './FilteringCriteria';

const Issues = () => {
  return (
    <Container className="h-100" fluid>
       <Row className="justify-content-center align-content-center">
         <Col className="col-12 shadow-lg rounded" lg="8">
           <FilteringCriteria />
         </Col>
       </Row>
    </Container>
  );
};

export default Issues;