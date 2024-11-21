# Automation with Playwright and Page Object Model

This repository showcases my work in automation using the Playwright framework and the Page Object Model (POM) pattern. The test environment is a demo e-commerce page.

## Getting Started

**Prerequisites:**

1. Download and install Node.js 14 or later.
2. Clone the repository
3. Install the necessary npm packages:
   `yarn install`

4. Install Playwright:
   `npx playwright install`

## Environmental Variables

| Variable    | Description                       | Default |     |
| ----------- | --------------------------------- | ------- | --- |
| ENVIRONMENT | Specifies the testing environment | demo    |     |

## Scripts

Use scripts to run the tests:

| Script   | Description                        | Command           |
| -------- | ---------------------------------- | ----------------- |
| test     | Run all tests                      | `npm run test`    |


## Project Structure

This project follows a structured approach to organize the codebase, making it easy to maintain and understand. The main components of the project structure are:

- **tests**: Contains the test files for our application. Each test file uses the page objects to perform the tests.
- **playwright.config.ts**: Configures Playwright settings, such as project-wide timeouts, browsers to use, and other settings.
- **package.json**: The main configuration file for the project. It contains metadata about the project, such as its name, version, and dependencies. It also includes scripts for running tasks, such as tests and building the project.

## Reporters

- Line: Provides a simple line-by-line summary of test results.
