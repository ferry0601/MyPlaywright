# MyPlaywright
📘 Playwright Automation Testing – Tutorial Project
📌 Description

This repository contains my Playwright automation testing practice based on an online tutorial.
The purpose of this project is to learn and understand end-to-end (E2E) testing, API testing, and UI automation using Playwright with JavaScript.

This is not a production project, but a learning playground to explore Playwright concepts and testing flows.

🛠 Tech Stack

Playwright

JavaScript (Node.js)

Playwright Test Runner

API + UI Integration Testing

VS Code

📂 Project Structure (Example)
├── tests/
│   ├── e2e/
│   ├── api/
│   └── utils/
├── playwright.config.js
├── package.json
└── README.md

🔍 What I Learned

Playwright test structure (test, beforeAll, beforeEach)

API testing using request.newContext()

Authentication via API and reusing token in UI tests

Page Object / Utility class concept

Handling locators and assertions

End-to-End testing flow (API → UI)

🚀 How to Run the Tests

Install dependencies

npm install


Run all tests

npx playwright test


Run tests with UI mode

npx playwright test --ui

🧪 Test Scenario Example

Login using API

Create order via API

Save token in localStorage

Open UI and validate created order
