import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import { useForm } from '../hooks/useForm';
const Calculator = () => {
  const { calculateChange } = useContext(GlobalContext);

  const shape = {
    currency: {
      validate: {
        type: 'string',
        required: true,
      },
      message: 'Select a currency',
      default: '',
    },
    price: {
      validate: {
        type: 'number',
        required: true,
        lte: 'tendered'
      },
      message: 'Price is invalid',
      default: '',
    },
    tendered: {
      validate: {
        type: 'number',
        required: true,
        gte: 'price',
      },
      message: 'Amount tendered is invalid',
      default: '',
    },
    json: {
      default: false
    }
  };

  const submitForm = (values) => {
    if (!errors.length) {
      calculateChange(values);
    }
  };

  const { values, handleChange, handleSubmit, errors, isSubmitted } = useForm(
    submitForm,
    shape
  );

  const getErrorMessage = (name) =>
    errors.find((err) => err.path === name)?.message || 'Invalid';
  const isValid = (name) =>
    isSubmitted ? !errors.find((err) => err.path === name) : true;

  return (
    <div className="calculator box" data-testid="calculator">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="currency" className="label is-medium">
            Currency
          </label>
          <div className="control">
            <select
              name="currency"
              id="currency"
              className={`select is-medium ${
                !isValid('currency') ? 'is-danger' : ''
              }`}
              value={values.currency}
              onChange={handleChange}
              data-testid="currency-select"
            >
              <option value="">Select currency</option>
              <option value="gbp">GBP</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>
          {!isValid('currency') && (
            <p className="help is-danger" data-testid="currency-error">{getErrorMessage('currency')}</p>
          )}
        </div>
        <div className="field">
          <label htmlFor="price" className="label is-medium">
            Product price
          </label>
          <div className="control">
            
            <input
              type="text"
              name="price"
              id="price"
              className={`input is-medium ${
                !isValid('price') ? 'is-danger' : ''
              }`}
              placeholder="0.00"
              value={values.price}
              onChange={handleChange}
              data-testid="price-input"
            />
          </div>
          {!isValid('price') && (
            <p className="help is-danger" data-testid="price-error">{getErrorMessage('price')}</p>
          )}
        </div>
        <div className="field">
          <label htmlFor="tendered" className="label is-medium">
            Tendered amount
          </label>
          <div className="control">
            <input
              type="text"
              name="tendered"
              id="tendered"
              className={`input is-medium ${
                !isValid('tendered') ? 'is-danger' : ''
              }`}
              placeholder="0.00"
              value={values.tendered}
              onChange={handleChange}
              data-testid="tendered-input"
            />
          </div>
          {!isValid('tendered') && (
            <p className="help is-danger" data-testid="tendered-error">{getErrorMessage('tendered')}</p>
          )}
        </div>
        <div className="field">
        <label className="checkbox" htmlFor="json">
  <input type="checkbox" name="json" onChange={handleChange} />
  Output results as JSON
</label>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-link is-medium" data-testid="submit-button">
              Calculate
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Calculator;
