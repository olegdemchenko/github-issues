import { useState } from 'react';

import IssuesWrapper from './IssuesWrapper';
import IssueDetails from './IssueDetails';
import FilteringCriteria from './FilteringCriteria';
import IssuesList from './IssuesList';
import { retrieveLabelsDescriptions, filterIssuesByCriteria, sortIssues } from '../utils';

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