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

const sortIssues = (order, issues) => {

  const compareFunctions = {
    'none': () => 0,
    'desc': (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
    'asc': (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  };
  console.log(order);
  return issues.sort(compareFunctions[order]);
};

const Issues = ({ issues }) => {
  const initCriteria = {
    labelFilter: '',
    assigneeFilter: '',
    sortOrder: 'none',
  };
  const [currentCriteria, setCriteria] = useState(initCriteria);

  const changeCriteria = (type, value) => {
    setCriteria((prevCriteria) => ({ ...prevCriteria, [type]: value }));
  };

  const issuesWithLabels = retrieveLabelsDescriptions(issues);
  const filteredIssues = filterIssuesByCriteria(currentCriteria, issuesWithLabels);
  const sortedIssues = sortIssues(currentCriteria.sortOrder, filteredIssues);

  return (
    <Container className="h-100" fluid>
       <Row className="justify-content-center align-content-center">
         <Col className="col-12 shadow-lg rounded px-5" lg="8">
           <FilteringCriteria criteria={currentCriteria} changeCriteria={changeCriteria}/>
           <IssuesList issues={sortedIssues}/>
         </Col>
       </Row>
    </Container>
  );
};

export default Issues;