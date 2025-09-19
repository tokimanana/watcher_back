# Course Review & Recommendation Engine - Watcher Backend

## 📚 Project Overview

**Watcher** is a sophisticated web application that helps students navigate the massive world of online courses. Acting as a "Yelp" or "Rotten Tomatoes" for online education, this platform aggregates course reviews and provides intelligent recommendations to help users find the perfect course for their needs.

### 🎯 Key Features

- **Course Aggregation**: Automated data collection from various online course platforms
- **User Reviews & Ratings**: Community-driven course evaluation system
- **Intelligent Recommendations**: AI-powered suggestion engine based on user preferences and similar user behavior
- **Course Discovery**: Advanced search and filtering capabilities
- **User Profiles**: Personalized learning journey tracking

## 🏗️ Architecture

This backend API follows Domain-Driven Design (DDD) principles with a clean, modular architecture:

```
src/
  application/      # Business logic, services, DTOs, recommendation algorithms
  config/           # Application configuration (database, external APIs)
  core/             # Domain entities (User, Course, Review, Rating)
  infrastructure/   # External integrations (web scrapers, database implementations)
  presentation/     # REST API endpoints, controllers, middleware
  shared/           # Common types, utilities, validation schemas
```

### 📁 Directory Details

- **application/**
  - Course recommendation algorithms
  - Review aggregation services
  - User preference analysis
  - Data processing workflows

- **config/**
  - Database configuration
  - External API credentials (course platforms)
  - Web scraping settings
  - Authentication configuration

- **core/**
  - **Entities**: `User`, `Course`, `Review`, `Rating`, `Category`, `Instructor`
  - **Services**: `CourseService`, `RecommendationService`, `ReviewService`
  - **Repositories**: Data access interfaces

- **infrastructure/**
  - Course data scrapers (Udemy, Coursera, edX, etc.)
  - Database repositories (TypeORM implementations)
  - External API integrations
  - Caching layer (Redis)

- **presentation/**
  - Authentication endpoints (`/auth`)
  - Course management (`/courses`)
  - Review system (`/reviews`)
  - Recommendation API (`/recommendations`)
  - User profiles (`/users`)

- **shared/**
  - Validation schemas
  - Common types and interfaces
  - Utility functions

## 🛠️ Tech Stack

### Backend
- **Node.js** & **TypeScript**
- **Express.js** (REST API)
- **TypeORM** (Database ORM)
- **PostgreSQL** (Primary database)
- **Redis** (Caching & sessions)
- **JWT** (Authentication)

### Development Tools
- **Inversify** (Dependency injection)
- **Joi** / **class-validator** (Input validation)
- **Winston** (Logging)
- **Jest** (Testing)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd watcher_back

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Setup database
pnpm run db:migrate
pnpm run db:seed

# Start development server
pnpm run dev
```

## 📊 Core Features Implementation

### Course Data Aggregation
- Automated web scrapers for major platforms
- Scheduled updates every 24 hours
- Data normalization and deduplication
- Course metadata extraction (price, duration, difficulty)

### Review System
- Star rating (1-5) with detailed reviews
- Review moderation and spam detection
- Helpful/unhelpful voting system
- Review analytics and insights

### Recommendation Engine
- **Collaborative Filtering**: "Users who liked X also liked Y"
- **Content-Based**: Recommendations based on course attributes
- **Hybrid Approach**: Combines multiple recommendation strategies
- **Cold Start Problem**: Handles new users with no history

### API Endpoints

```
Authentication
POST /auth/register
POST /auth/login
POST /auth/refresh


**Watcher** - Helping students find their perfect learning path through intelligent course recommendations.
