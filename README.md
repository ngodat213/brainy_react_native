# 📱 Brainy Vocabulary - Mobile Learning App

<p align="center">
  <img src="https://reactnative.dev/img/tiny_logo.png" alt="React Native Logo" width="120" />
</p>

## 📑 Project Overview

Brainy is a sophisticated mobile vocabulary learning application built with React Native that helps users expand their vocabulary through an intuitive, feature-rich platform. The app employs scientifically-backed spaced repetition techniques to optimize the learning process and improve long-term retention.

## 🛠️ Tech Stack & Architecture

### Core Technologies
- **Frontend**: React Native, TypeScript
- **State Management**: Redux Toolkit, Redux Thunk
- **UI/UX**: Custom components with responsive design
- **API Integration**: Axios, RESTful endpoints
- **Authentication**: JWT token-based auth
- **Persistence**: AsyncStorage, Redux Persist

### Architecture
The project follows a clean architecture approach with clear separation of concerns:

```
src/
├── app/             # Application setup and navigation
├── core/            # Core utilities, constants, helpers
├── data/            # Data layer (repositories, API clients, models)
├── domain/          # Business logic (entities, use cases, repositories interfaces)
├── presentation/    # UI layer (screens, components, state management)
```

- **Domain Layer**: Contains business entities and logic, independent of frameworks
- **Data Layer**: Implements repositories and handles external data sources
- **Presentation Layer**: Manages UI components and state

## ✨ Key Features

### 📚 Vocabulary Management
- Comprehensive dictionary with Oxford 3000 words
- Detailed word information including definitions, phonetics, and examples
- Audio pronunciation for proper learning
- Part of speech classification with visual color coding

### 🧠 Learning System
- Smart spaced repetition algorithm for optimized learning
- Progress tracking across different categories
- Learning analytics to visualize improvement
- Word status tracking (Learning, Learned, Skipped)

### 📊 User Experience
- Intuitive search functionality with smart debouncing
- Category-based learning paths
- Personalized learning journey
- Cross-platform support (iOS and Android)
- Light/dark theme support
- Offline learning capability

### 🔐 User Management
- Secure authentication system
- Personal progress tracking
- Customizable learning preferences

## 📱 Screens & Functionality

### 🏠 Main Screens
- **Dictionary**: Browse and search vocabulary with smart filtering
- **Learning**: Interactive learning sessions with spaced repetition
- **VocabDetail**: Comprehensive word details with pronunciation and examples
- **Categories**: Organized learning paths by topic
- **Profile**: User preferences and progress statistics

### 🔄 Core Workflows
- User onboarding and authentication
- Vocabulary discovery and searching
- Interactive learning sessions
- Progress tracking and analytics
- Content categorization

## 🚀 Development Approach

### Code Quality
- Strong TypeScript typing for reliability
- Consistent coding standards
- Comprehensive entity modeling
- Thorough error handling

### State Management
- Centralized Redux store
- Slice-based state organization
- Thunk middleware for async operations
- Selectors for optimized state access

### Scalability Considerations
- Modular component architecture
- Separation of concerns through clean architecture
- Reusable UI components library
- Extensible entity models

## 🔧 Setup & Usage

### Prerequisites
- Node.js 14+
- React Native environment setup
- Yarn or npm

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
yarn install

# iOS setup
cd ios && bundle install && bundle exec pod install && cd ..

# Run the application
yarn start
yarn ios     # For iOS
yarn android # For Android
```

## 📋 Project Status

The application is currently in active development with core features implemented and functional. Ongoing work includes:
- Enhanced offline capabilities
- Expanded word dataset integration
- Advanced analytics for learning patterns
- Performance optimizations

---

<p align="center">
  <sub>Built with ❤️ by the Brainy Vocabulary team</sub>
</p>
