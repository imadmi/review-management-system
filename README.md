# Review Management System

A Full stack web application for managing company reviews built with Next.js, and Prisma. Users can create, read, update, and delete company reviews with star ratings and detailed feedback.

## Features

- 🔍 Real-time search functionality
- 📱 Responsive design
- 🎨 Material-UI components
- 📊 Pagination for better performance
- 🚀 CRUD operations for reviews
- 🔔 Toast notifications for user feedback

## Tech Stack

- **Frontend**: Next.js, Material-UI, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Container**: Docker

## Prerequisites

- Node.js
- Docker
- npm

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/imadmi/review-management-system.git
cd review-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database using Docker:
```bash
docker-compose up -d
```

4. Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/reviews?schema=public"
```

5. Run Prisma migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Configuration

Create a `docker-compose.yml` file in the root directory:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:latest
    container_name: review_management_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: reviews
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── reviews/[id]/route.ts
│   │       └── route.ts
│   └── page.tsx
├── components/
│   ├── ReviewForm.tsx
│   ├── ReviewList.tsx
│   └── Modal.tsx
├── hooks/
│   └── useReviews.ts
├── prisma/
│   └── schema.prisma
└── types/
    └── types.ts
```

## API Endpoints

- `GET /api/reviews` - Fetch all reviews
- `POST /api/reviews` - Create a new review
- `PUT /api/reviews/:id` - Update an existing review
- `DELETE /api/reviews/:id` - Delete a review

## Future Enhancement Ideas

1. **Authentication & Authorization**
   - User registration and login
   - Social media authentication

2. **Enhanced Review Features**
   - Multiple categories for ratings (work-life balance, salary, etc.)
   - Photo attachments

3. **Analytics & Reporting**
   - Company rating trends over time
   - Statistical analysis dashboard

4. **Search & Filtering**
   - Filter by date or rating range
   - Sorting options