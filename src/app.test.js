import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from './Components/App';
import { server } from './mocks/server';

describe('test authentication', () => {
  test('check wrong user credentials', async () => {
    render(<App/>);
    const usernameInput = screen.getByRole('textbox', { name: "username" });
    const repositoryInput = screen.getByRole('textbox', { name: "repository" });

    userEvent.type(usernameInput, '_incorrectusername_');
    userEvent.type(repositoryInput, '0'.repeat(110));
    expect(await screen.findByText(/username should correspond to github requirements/i)).toBeVisible();
    expect(await screen.findByText(/repository must be at most 100 characters/i)).toBeVisible();
  });

  test('check hiding error messages', async () => {
    render(<App/>);
    const usernameInput = screen.getByRole('textbox', { name: "username" });
    const repositoryInput = screen.getByRole('textbox', { name: "repository" });

    userEvent.click(usernameInput);
    userEvent.click(repositoryInput);
    expect(await screen.findByText(/username is a required field/i)).toBeVisible();
    expect(await screen.findByText(/repository is a required field/i)).toBeVisible();
    
    userEvent.type(usernameInput, 'username');
    userEvent.type(repositoryInput, 'repository');

    await waitFor(() => {
      expect(screen.queryByText(/username is a required field/i)).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText(/repository is a required field/i)).not.toBeInTheDocument();
    })
  });
});

describe('test fetching issues', () => {
  beforeAll(() => server.listen());
  
  beforeEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('check non existing user', async () => {
    render(<App/>);
    const usernameInput = screen.getByRole('textbox', { name: "username" });
    const repositoryInput = screen.getByRole('textbox', { name: "repository" });
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    userEvent.type(usernameInput, 'notexisteduser');
    userEvent.type(repositoryInput, 'notexistedrepo');
    userEvent.click(submitButton);

    expect(await screen.findAllByText(/username or repository is incorrect/i)).toHaveLength(2);
  });

  test('check existing user', async () => {
    render(<App/>);
    const usernameInput = screen.getByRole('textbox', { name: "username" });
    const repositoryInput = screen.getByRole('textbox', { name: "repository" });
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    userEvent.type(usernameInput, 'user');
    userEvent.type(repositoryInput, 'repo');
    userEvent.click(submitButton);
   
    expect(await screen.findByText(/issue title/i)).toBeInTheDocument()
  });

  test('check issue details', async () => {
    render(<App/>);
    const usernameInput = screen.getByRole('textbox', { name: "username" });
    const repositoryInput = screen.getByRole('textbox', { name: "repository" });
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    userEvent.type(usernameInput, 'user');
    userEvent.type(repositoryInput, 'repo');
    userEvent.click(submitButton);
    const testIssue = await screen.findByText(/issue title/i);
    expect(testIssue).toBeInTheDocument();

    userEvent.click(testIssue);
    expect(await screen.findByText(/body/i)).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: 'Go back' });
    userEvent.click(backButton);

    expect(await screen.findByText(/issue title/i)).toBeInTheDocument();
  });
});