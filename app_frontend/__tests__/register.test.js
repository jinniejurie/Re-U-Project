import { render, screen, fireEvent } from '@testing-library/react';
import Register from '@/app/register/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('Register Page', () => {
  it('renders register form', () => {
    render(<Register />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^username$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows error if passwords do not match', () => {
    render(<Register />);
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'testpass123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'different' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
  });
});