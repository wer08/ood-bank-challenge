import { render, screen, fireEvent } from '@testing-library/react';
import Account from './Account';

describe('Account', () => {

  let depositField: HTMLElement;
  let withdrawField: HTMLElement;
  beforeEach(() => {
    render(<Account />);
    
    depositField =screen.getByTestId("deposit")
    withdrawField =screen.getByTestId("withdraw")
  });


  it('should have initial balance of 0', () => {
    const balanceText = screen.getByText(/Balance: \$0.00/);
    expect(balanceText).toBeInTheDocument();
  });

  it('should deposit money correctly', () => {
    const depositButton = screen.getByText('Deposit');
    fireEvent.change(depositField,{target: { value: 1000}})
    fireEvent.click(depositButton);
    const balanceText = screen.getByText(/Balance: \$1000.00/);
    expect(balanceText).toBeInTheDocument();
  });
    
  it('should withdraw money correctly if balance is sufficient', () => {
    const depositButton = screen.getByText('Deposit');
    fireEvent.change(depositField,{target: { value: 1000}})
    fireEvent.click(depositButton);
    const withdrawButton = screen.getByText('Withdraw');
    fireEvent.change(withdrawField,{target: { value: 1000}})
    fireEvent.click(withdrawButton);
    const balanceText = screen.getByText(/Balance: \$0.00/);
    expect(balanceText).toBeInTheDocument();
  });
  it('should not withdraw money if balance is insufficient', () => {
    const mockAlert = jest.spyOn(window, 'alert');
    mockAlert.mockImplementation(() => {});
    const depositButton = screen.getByText('Deposit');
    fireEvent.change(depositField,{target: { value: 1000}})
    fireEvent.click(depositButton);
    const withdrawButton = screen.getByText('Withdraw');
    fireEvent.change(withdrawField,{target: { value: 2000}})
    fireEvent.click(withdrawButton);
    expect(mockAlert).toHaveBeenCalledWith('Insufficient funds.');

  });



});

