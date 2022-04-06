import { rest } from 'msw';

const testIssue = {
  title: "Issue title",
  labels: [
    {
      description: "Pull requests that update a dependency file"
    }
  ],
  assignee: null,
  comments: 0,
  state: "open",
  body: "Some information"
};

export const handlers = [
  rest.get('https://api.github.com/repos/notexisteduser/notexistedrepo/issues', (req, res, ctx) => {
    return res(
      ctx.status(404)
    );
  }),
  rest.get('https://api.github.com/repos/user/repo/issues', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([testIssue])
    )
  })
];