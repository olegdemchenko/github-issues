import { useState } from 'react';
import {
  Row, 
  Col,
  Container,
} from 'react-bootstrap';

import FilteringCriteria from './FilteringCriteria';
import IssuesList from './IssuesList';

const Issues = ({ issues }) => {
  const initCriteria = {
    labelFilter: '',
    assigneeFilter: '',
    sortOrder: '',
  };
  const [currentCriteria, setCriteria] = useState(initCriteria);

  const changeCriteria = (type, value) => {
    setCriteria((prevCriteria) => ({ ...prevCriteria, [type]: value }));
  };

  return (
    <Container className="h-100" fluid>
       <Row className="justify-content-center align-content-center">
         <Col className="col-12 shadow-lg rounded px-5" lg="8">
           <FilteringCriteria criteria={currentCriteria} changeCriteria={changeCriteria}/>
           <IssuesList issues={issues}/>
         </Col>
       </Row>
    </Container>
  );
};

export default Issues;