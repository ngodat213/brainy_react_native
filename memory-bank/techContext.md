# Technical Context

## Tech Stack
- React Native for mobile app development
- TypeScript for type safety
- Redux for state management
- i18next for internationalization
- Axios for API communication
- React Navigation for routing
- Encrypted Storage for secure data storage

## Project Structure
The project follows a clean architecture pattern with clear separation of concerns:

```
├── app/                 # Application core setup
│   ├── navigation/     # Navigation configuration
│   ├── i18n/          # Internationalization setup
│   └── providers/     # App-wide providers
├── core/               # Core functionality
│   ├── services/      # Core services (API, etc.)
│   ├── theme/         # Theming system
│   ├── types/         # Core type definitions
│   └── utils/         # Utility functions
├── data/              # Data layer
│   ├── datasources/   # Data sources implementation
│   ├── models/        # Data transfer objects
│   └── repositories/  # Repository implementations
├── domain/            # Business logic layer
│   ├── entities/      # Business entities
│   ├── repositories/  # Repository interfaces
│   └── usecases/     # Business use cases
└── presentation/      # UI layer
    ├── components/    # Reusable UI components
    ├── screens/       # Application screens
    └── store/        # Redux store setup
```

## Key Technical Decisions

### API Integration
- Using Axios with interceptors for API calls
- Base URL configuration through environment variables
- Token-based authentication with encrypted storage
- Centralized error handling in API service

### Component Architecture
1. Base Components:
   - `BaseButton`: Flexible button component with variants (primary/secondary/outline)
   - `BaseText`: Typography component
   - `BaseCard`, `BaseInput`, `BaseView`: Core UI building blocks

2. Feature Components:
   - `Button`: Simplified button implementation
   - `LanguageSwitch`: Language toggle component

### State Management
- Redux for global state management
- Typed selectors and actions using Redux Toolkit
- Thunks for handling async operations

### Authentication
- Token-based authentication
- Secure token storage using EncryptedStorage
- Login flow with error handling

### Internationalization
- i18next integration
- Support for English (en) and Vietnamese (vi)
- Language switch functionality

## Development Setup
- Environment: React Native CLI
- API Base URL: http://192.168.0.105:8888/brainy_php/index.php/api
- Timeout configuration: 10 seconds for API calls

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