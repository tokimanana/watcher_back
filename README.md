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
- Docker & Docker Compose (for containerized development)

### 🐳 Docker Development (Recommended)

The easiest way to get started is using Docker Compose, which will set up all required services automatically:

```bash
# Clone the repository
git clone <repository-url>
cd watcher_back

# Start all services with Docker Compose
docker-compose up --build

# The API will be available at http://localhost:3000
# PostgreSQL will be available at localhost:5432
# Redis will be available at localhost:6379
```

#### Docker Services

The `docker-compose.yml` includes:
- **API Server**: Node.js application running on port 3000
- **PostgreSQL**: Database server on port 5432
- **Redis**: Cache server on port 6379

#### Docker Commands

```bash
# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build

# Run database migrations in container
docker-compose exec app pnpm run db:migrate

# Seed database with initial data
docker-compose exec app pnpm run db:seed

# Run tests in container
docker-compose exec app pnpm test

# Access container shell
docker-compose exec app sh
```

### 📦 Local Development (Alternative)

If you prefer to run without Docker:

```bash
# Clone the repository
git clone <repository-url>
cd watcher_back

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Make sure PostgreSQL and Redis are running locally
# Then setup database
pnpm run db:migrate
pnpm run db:seed

# Start development server
pnpm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=watcher
DB_SYNCHRONIZE=false

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# External APIs (optional)
UDEMY_API_KEY=your-udemy-api-key
COURSERA_API_KEY=your-coursera-api-key

# Scraping Configuration
SCRAPING_DELAY=2000
MAX_CONCURRENT_SCRAPERS=5
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

Courses
GET  /courses              # Search courses with filters
GET  /courses/:id          # Get course details
POST /courses/:id/reviews  # Add review
GET  /courses/:id/reviews  # Get course reviews

Recommendations
GET  /recommendations/for-you     # Personalized recommendations
GET  /recommendations/trending    # Trending courses
GET  /recommendations/similar/:id # Similar courses

Users
GET  /users/profile       # Get user profile
PUT  /users/profile       # Update profile
GET  /users/watchlist     # Get saved courses
POST /users/watchlist/:id # Add to watchlist
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run integration tests
pnpm test:integration

# Run tests in Docker
docker-compose exec app pnpm test
```

## 🚀 Production Deployment

### Building for Production

```bash
# Build the application
pnpm run build

# Start production server
pnpm start
```

### Docker Production Build

```bash
# Build production image
docker build -t watcher-backend:latest .

# Run production container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=your-production-db-url \
  -e REDIS_URL=your-production-redis-url \
  watcher-backend:latest
```

## 📈 Future Enhancements

- **ML Model Improvements**: Advanced neural collaborative filtering
- **Real-time Notifications**: Course updates, price drops
- **Social Features**: Follow instructors, share course lists
- **Mobile API**: Optimized endpoints for mobile apps
- **Analytics Dashboard**: Course performance insights

## 🤝 Contributing

Please follow the established architecture patterns and ensure all new features include appropriate tests. Refer to the [Contributing Guidelines](CONTRIBUTING.md) for detailed information.

## 📝 Development Notes

### Database Schema
The application uses TypeORM with PostgreSQL. Database migrations are located in `src/migrations/`.

### API Documentation
Once the server is running, API documentation will be available at `http://localhost:3000/api-docs` (Swagger/OpenAPI).

### Logging
Application logs are managed by Winston and can be found in the `logs/` directory during development.

---

**Watcher** - Helping students find their perfect learning path through intelligent course recommendations.
