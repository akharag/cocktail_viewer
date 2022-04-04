# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## [Set up Husky with Prettier and ESLint](https://dev.to/smetankajakub/how-to-integrate-husky-eslint-prettier-to-project-in-less-than-15-minutes-5gh)

### What is [Prettier](https://prettier.io/)?

Prettier is a _"opinionated code formater"_ that automatically formats your code on save. This will create consistency between team members.

### What is [ESLint](https://eslint.org/)?

ESLint is a tool that analyzes your code trying to identify issues in real time.

### What is [Husky](https://github.com/typicode/husky)?

Husky is a tool that is used to run git hooks.

### What is the purpose?

Prettier and ESLint will

1. Reduce the amount of differences in people's code by unifying the styling making issues easier to find
1. Reduce errors by analyzing the code and displaying issues before runtime

Husky will enforce these tools by not allowing commits unless a user complies with these.

On your initial commit or if automatic formating for prettier has not be set up:

    npx pretty-quick
