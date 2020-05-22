import React, { useContext, Fragment } from 'react';
import { GlobalContext } from '../GlobalContext';

const Results = () => {
  const { results } = useContext(GlobalContext);
  if (!results) return null;
  const { change = [], totalChange = '', price = '', tendered = '', jsonChange = null } = results;
  if (jsonChange) {
    return <p className="title is-4">Coming soon...</p>
  }
  return (
    <section className="box">
      <p className="title is-4">{`You supplied ${tendered}, with a product price of ${price}`}</p>
      {change.length > 0 && (
        <Fragment>
          <p className="title is-5">This is your change:</p>
          <ul data-testid="results" className="title is-5">
            {change.map(({ title, total }, i) => (
              <li key={i} data-testid="result-item">
                <span>{`${total}x ${title}`}</span>
              </li>
            ))}
          </ul>
        </Fragment>
      )}
      <p className="title is-4">Total change: {totalChange}</p>
    </section>
  );
};

export default Results;
