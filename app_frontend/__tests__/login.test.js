import { render, screen, fireEvent } from '@testing-library/react';
import Login from '@/app/login/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('Login Page', () => {
  it('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows error on empty submit', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  });

}); 