# Technical Context

## Development Environment
- Node.js
- React Native CLI
- iOS Simulator / Android Emulator
- VS Code with React Native extensions

## Dependencies
### Core
- react-native: Latest version
- typescript: ^4.x
- @types/react-native: Latest version

### State Management
- @reduxjs/toolkit
- react-redux
- redux-persist

### Navigation
- @react-navigation/native
- @react-navigation/stack
- @react-navigation/bottom-tabs

### API & Data
- axios
- react-query

### Testing
- jest
- @testing-library/react-native
- @testing-library/jest-native

### Styling
- styled-components
- react-native-vector-icons

### Utilities
- react-native-config
- i18next
- react-i18next

## Development Setup
1. Install dependencies:
```bash
npm install
```

2. iOS setup:
```bash
cd ios && pod install
```

3. Start development:
```bash
npm run start
```

## Code Style
- ESLint configuration
- Prettier for code formatting
- TypeScript strict mode enabled
- Component naming: PascalCase
- File naming: kebab-case
- Constants: UPPER_SNAKE_CASE

## Git Workflow
- Feature branches
- Pull requests
- Conventional commits
- Pre-commit hooks for linting and formatting 