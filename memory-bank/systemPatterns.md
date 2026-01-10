# System Patterns

## Architecture Overview
The application follows Clean Architecture principles with clear separation of concerns:

1. Presentation Layer (UI)
   - Screens and Components
   - Redux Store
   - UI Mappers

2. Domain Layer (Business Logic)
   - Entities
   - Use Cases
   - Repository Interfaces

3. Data Layer
   - DTOs
   - Repository Implementations
   - Data Sources

## Design Patterns

### Component Patterns
1. Base Component Pattern
   - All base components in `presentation/components/base/`
   - Consistent styling and behavior
   - Variants and props standardization
   - Example: BaseButton with primary/secondary/outline variants

2. Screen Pattern
   - Consistent screen structure
   - Separate files for:
     - Component logic (index.tsx)
     - Styles (styles.ts)
     - Types (types.ts)

### State Management Pattern
1. Redux Implementation
   - Slices for feature-based state
   - Typed selectors for state access
   - Thunks for async operations
   - Example: Auth state management

2. Local State Management
   - useState for component-level state
   - Form state management in screens

### API Integration Pattern
1. Centralized API Service
   - Base configuration
   - Interceptors for:
     - Token management
     - Error handling
   - Response type standardization

2. Repository Pattern
   - Interface definition in domain layer
   - Implementation in data layer
   - Clean separation of data access

### Authentication Pattern
1. Token-based Authentication
   - Secure storage of tokens
   - Automatic token injection
   - Error handling for auth failures

### Internationalization Pattern
1. i18n Implementation
   - Centralized translations
   - Language switch mechanism
   - Locale files organization

## Critical Implementation Paths

### Authentication Flow
1. User input validation
2. API call through auth repository
3. Token storage on success
4. Navigation to home screen
5. Error handling and user feedback

### Component Hierarchy
1. Base components (BaseButton, BaseText, etc.)
2. Feature-specific components
3. Screen components
4. Navigation structure

### State Flow
1. Action dispatch
2. Thunk middleware (for async)
3. State update
4. UI update through selectors

## Key Technical Decisions
1. Clean Architecture for maintainability
2. TypeScript for type safety
3. Base components for consistency
4. Centralized state management
5. Secure storage for sensitive data

## Key Implementation Paths

### Authentication Flow
1. Login Screen
2. API Authentication
3. Token Storage
4. Navigation to Main App

### Data Fetching
1. API Service Call
2. Repository Implementation
3. Use Case Execution
4. State Update
5. UI Rendering

### Error Handling
1. API Error Interception
2. Error Transformation
3. Error Display
4. Recovery Options

## Component Relationships
```
App
├── NavigationContainer
│   ├── AuthStack
│   └── MainStack
├── ReduxProvider
├── ThemeProvider
└── I18nProvider
``` 