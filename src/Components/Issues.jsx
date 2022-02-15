import { useState } from 'react';
import {
  Row, 
  Col,
  Container,
} from 'react-bootstrap';

import FilteringCriteria from './FilteringCriteria';
import IssuesList from './IssuesList';

const retrieveLabelsDescriptions = (issues) => {
  return issues.map((issue) => {
    const labelsDescriptions = issue.labels.map(({ description }) => description);
    return { ...issue, labels: labelsDescriptions };
  });
};

const filterIssuesByCriteria = (criteria, issues) => {
  return issues.filter((issue) => {
    return issue.labels.some((label) => label.includes(criteria.labelFilter));
  })
   .filter((issue) => {
     if (!criteria.assigneeFilter) {
       return true;
     }
     return issue.assignee?.startsWith(criteria.assigneeFilter);
   });
};

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

  const issuesWithLabels = retrieveLabelsDescriptions(issues);
  const filteredIssues = filterIssuesByCriteria(currentCriteria, issuesWithLabels);

  return (
    <Container className="h-100" fluid>
       <Row className="justify-content-center align-content-center">
         <Col className="col-12 shadow-lg rounded px-5" lg="8">
           <FilteringCriteria criteria={currentCriteria} changeCriteria={changeCriteria}/>
           <IssuesList issues={filteredIssues}/>
         </Col>
       </Row>
    </Container>
  );
};

export default Issues;