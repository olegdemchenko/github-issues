import { useState } from 'react';

import IssuesWrapper from './IssuesWrapper';
import IssueDetails from './IssueDetails';
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
  return issues.sort(compareFunctions[order]);
};

const Issues = ({ issues }) => {
  const initialRenderInfo = { render: "list" };
  const [renderInfo, setRenderInfo] = useState(initialRenderInfo);
  const initCriteria = {
    labelFilter: '',
    assigneeFilter: '',
    sortOrder: 'none',
  };
  const [currentCriteria, setCriteria] = useState(initCriteria);
  const showIssueDetails = (issue) => setRenderInfo({ render: "details", item: issue });
  const showIssuesList = () => setRenderInfo(initialRenderInfo);
  
  if (renderInfo.render === "details") {
    return (
      <IssuesWrapper>
        <IssueDetails issue={renderInfo.item} goBack={showIssuesList} />
      </IssuesWrapper>
    )
  }
  const changeCriteria = (type, value) => {
    setCriteria((prevCriteria) => ({ ...prevCriteria, [type]: value }));
  };

  const issuesWithLabels = retrieveLabelsDescriptions(issues);
  const filteredIssues = filterIssuesByCriteria(currentCriteria, issuesWithLabels);
  const sortedIssues = sortIssues(currentCriteria.sortOrder, filteredIssues);

  return (
    <IssuesWrapper>
      <FilteringCriteria
        criteria={currentCriteria}
        changeCriteria={changeCriteria}
      />
      <IssuesList issues={sortedIssues} showDetails={showIssueDetails}/>
    </IssuesWrapper>
  );
};

export default Issues;