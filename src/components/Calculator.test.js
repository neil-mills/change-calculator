import React from 'react';
import { render, fireEvent, cleanup, getAllByTestId } from '@testing-library/react';
import Calculator from './Calculator';
import Results from './Results';
import { GlobalProvider } from '../GlobalContext';

const renderComponent = (children, context = {}) =>
  render(
    <GlobalProvider {...context}>
      {children}
    </GlobalProvider>
  );

describe('Calculator', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the component', () => {
    const { asFragment } = renderComponent(<Calculator />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('Validation', () => {
    const calculateChange = jest.fn();
    const mockContext = {
      calculateChange,
      results: [],
    };

    it('does not display error messages on mount', () => {
      const { queryByTestId } = renderComponent(<Calculator />, mockContext);
      expect(queryByTestId('currency-error')).toBeFalsy();
      expect(queryByTestId('price-error')).toBeFalsy();
      expect(queryByTestId('tendered-error')).toBeFalsy();
    });

    it('shows error and does not submit if no currency selected', () => {
      const { getByTestId } = renderComponent(<Calculator />,mockContext);
      fireEvent.click(getByTestId('submit-button'));
      expect(getByTestId('currency-error')).toBeTruthy();
      expect(calculateChange).toHaveBeenCalledTimes(0);
    });

    it('shows error and does not submit if price value is invalid', () => {
      const { getByTestId } = renderComponent(<Calculator />, mockContext);
      const input = getByTestId('price-input');
      const submit = getByTestId('submit-button');
      fireEvent.click(submit);
      const error = getByTestId('price-error');
      expect(error).toBeTruthy();
      expect(calculateChange).toHaveBeenCalledTimes(0);
      fireEvent.change(input, { target: { value: '2.nn' } });
      fireEvent.click(submit);
      expect(error).toBeTruthy();
      expect(calculateChange).toHaveBeenCalledTimes(0);
    });

    it('shows error and does not submit if tendered value is invalid', () => {
      const { getByTestId } = renderComponent(<Calculator />, mockContext);
      const input = getByTestId('tendered-input');
      const submit = getByTestId('submit-button');
      fireEvent.click(submit);
      const error = getByTestId('tendered-error');
      expect(error).toBeTruthy();
      expect(calculateChange).toHaveBeenCalledTimes(0);
      fireEvent.change(input, { target: { value: '2.nn' } });
      fireEvent.click(submit);
      expect(error).toBeTruthy();
      expect(calculateChange).toHaveBeenCalledTimes(0);
    });

    it('shows errors if tendered amount is less than price', () => {
      const { getByTestId } = renderComponent(<Calculator />, mockContext);
      const price = getByTestId('price-input');
      const tendered = getByTestId('tendered-input');
      fireEvent.change(price, { target: { value: '10.00' } });
      fireEvent.change(tendered, { target: { value: '5.00' } });
      fireEvent.click(getByTestId('submit-button'));
      const priceError = getByTestId('price-error');
      const tenderedError = getByTestId('tendered-error');
      expect(priceError).toBeTruthy();
      expect(tenderedError).toBeTruthy();
      expect(calculateChange).toHaveBeenCalledTimes(0);
    });

    it('submits if all form values are valid', () => {
      const { getByTestId } = renderComponent(<Calculator />, mockContext);
      const currency = getByTestId('currency-select');
      const price = getByTestId('price-input');
      const tendered = getByTestId('tendered-input');
      fireEvent.change(currency, { target: { value: 'gbp' } });
      fireEvent.change(price, { target: { value: '9.99' } });
      fireEvent.change(tendered, { target: { value: '20.00' } });
      fireEvent.click(getByTestId('submit-button'));
      expect(calculateChange).toHaveBeenCalledTimes(1);
    });
  });
  describe('Integration tests', () => {
    it('displays the correct results', () => {
      const { getByTestId, getAllByTestId, debug } = renderComponent(<div><Calculator /><Results /></div>);
      const currency = getByTestId('currency-select');
      const price = getByTestId('price-input');
      const tendered = getByTestId('tendered-input');
      fireEvent.change(currency, { target: { value: 'gbp' } });
      fireEvent.change(price, { target: { value: '11.99' } });
      fireEvent.change(tendered, { target: { value: '20.00' } });
      fireEvent.click(getByTestId('submit-button'));
      const results = getAllByTestId('result-item');
      debug();
      expect(results.length).toEqual(4);

    })
  })
});
