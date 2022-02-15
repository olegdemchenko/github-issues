const retrieveLabelsDescriptions = (issues) => {
  return issues.map((issue) => {
    const labelsDescriptions = issue.labels.map(
      ({ description }) => description
    );
    return { ...issue, labels: labelsDescriptions };
  });
};

const filterIssuesByCriteria = (criteria, issues) => {
  return issues
    .filter((issue) => {
      return issue.labels.some((label) => label.includes(criteria.labelFilter));
    })
    .filter((issue) => {
      if (!criteria.assigneeFilter) {
        return true;
      }
      return issue.assignee?.login?.includes(criteria.assigneeFilter);
    });
};

const sortIssues = (order, issues) => {
  const compareFunctions = {
    none: () => 0,
    desc: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
    asc: (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
  };
  return issues.sort(compareFunctions[order]);
};

export { retrieveLabelsDescriptions, filterIssuesByCriteria, sortIssues };