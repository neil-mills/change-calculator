This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Change Calculator

Technical test set by Tunstall Health

## Dev & Tech choices

I've used the React context api and hooks for state management. I have made this choice to demonstate my skill and knowledge of utilising the latest react technologies and workflows.

I've used bulma for styling the UI. This choice was solely based on time constraints.

I've chosen to write a basic form validation hook solely to demonstrate my dev skill. In a real-world application i would normally reach for a more robust validation package such as validation.js 

For testing, i've used Jest and React Testing Library by Kent C Dodds which comes bundled with Create React App. 

## To do

If i was to spend additional time on development the application, I would:

- Enhance the UI, possibly removing Bulma as a dependency and using styling components
- Remove custom validation hook and replace with a dependency such as validation.js
- Improve validation to check for zero values on price and tendered fields.
- Improve test coverage of components

## Running the app

Run `npm run start` or `yarn start` from the project root directory

## Running tests

Run `npm run test` or `yarn test` from the project root directory
