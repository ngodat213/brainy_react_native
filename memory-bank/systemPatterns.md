# System Patterns

## Architecture
Clean Architecture with the following layers:

### Presentation Layer (src/presentation)
- Screens
- Components
- Navigation
- UI State Management

### Domain Layer (src/domain)
- Entities
- Use Cases
- Repositories Interfaces
- Business Logic

### Data Layer (src/data)
- API Services
- Repositories Implementation
- Data Models
- Local Storage

### Core Layer (src/core)
- Utilities
- Constants
- Shared Components
- Hooks

## Design Patterns

### State Management
- Redux for global state
- Context API for theme/localization
- Custom hooks for component state

### Component Patterns
- Container/Presenter pattern
- Higher-Order Components
- Custom Hooks
- Compound Components

### Navigation
- Stack Navigation for authentication
- Tab Navigation for main app
- Modal Navigation for overlays

### API Integration
- Repository pattern
- Service layer abstraction
- Error handling middleware
- Request/Response interceptors

### Data Flow
```
UI Action -> Use Case -> Repository -> API Service -> Backend
Backend Response -> API Service -> Repository -> Use Case -> UI Update
```

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