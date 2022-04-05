import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from './Components/App';

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