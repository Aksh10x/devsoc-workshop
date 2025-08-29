# Dating App Server (Django REST API)

A Django REST API backend for a dating application with user authentication, profile management, and matching functionality.

## Features

- User registration and authentication (JWT)
- User profiles with images and preferences
- Swipe functionality (like/pass)
- Match detection and management
- Sample data generation for testing

## Tech Stack

- **Django 5.1+** - Web framework
- **Django REST Framework** - API framework
- **JWT Authentication** - Token-based auth
- **SQLite** - Database (development)
- **Pillow** - Image processing
- **CORS Headers** - Cross-origin requests

## Setup Instructions

### Prerequisites

- Python 3.8+
- UV package manager (recommended) or pip
- Virtual environment

### Installation

1. **Navigate to the server directory:**
   ```bash
   cd server/datingapp
   ```

2. **Create and activate virtual environment:**
   ```bash
   # Using uv (recommended)
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate

   # Or using standard venv
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   # Using uv
   uv pip install -r requirements.txt

   # Or using pip
   pip install -r requirements.txt
   ```

   **Required packages:**
   - Django>=5.1
   - djangorestframework
   - djangorestframework-simplejwt
   - django-cors-headers
   - Pillow

4. **Run database migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create sample data (recommended for testing):**
   ```bash
   python manage.py create_sample_data
   ```

6. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

The server will be available at `http://127.0.0.1:8000/`

## API Endpoints

### Authentication

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/refresh/` - Refresh JWT token

### User Management

- `GET /api/auth/user/` - Get current user profile
- `PUT /api/auth/user/` - Update user profile
- `POST /api/upload/` - Upload profile image

### Dating Features

- `GET /api/dating/users/` - Get potential matches
- `POST /api/dating/interact/` - Record swipe interaction
- `GET /api/dating/matches/` - Get user matches

### Admin

- `GET /admin/` - Django admin interface

## Sample API Usage

### 1. Register a new user

```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "secure123",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "secure123"
  }'
```

Response:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### 3. Get potential matches

```bash
curl -X GET http://localhost:8000/api/dating/users/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Swipe right (like) on a user

```bash
curl -X POST http://localhost:8000/api/dating/interact/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "target_user_id": 2,
    "interaction_type": "like"
  }'
```

### 5. Get matches

```bash
curl -X GET http://localhost:8000/api/dating/matches/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Management Commands

### Create Sample Data

Creates sample users with profiles for testing:

```bash
python manage.py create_sample_data
```

This creates:
- 10 sample users with random profiles
- Random profile images
- Sample bios and interests
- Ages between 18-35

### Clear Data

Remove all users and interactions:

```bash
python manage.py clear_data
```

## Sample Interactions for Testing

After running `create_sample_data`, you can test the following scenarios:

1. **Register a new user** and login
2. **Get potential matches** - should return sample users
3. **Swipe right** on a few users
4. **Check for matches** - if sample users also liked you back
5. **Update your profile** with bio and interests

## Project Structure

```
server/datingapp/
├── accounts/           # User authentication app
│   ├── models.py      # Custom User model
│   ├── serializers.py # API serializers
│   ├── views.py       # Authentication views
│   └── urls.py        # Auth URLs
├── dating/            # Dating functionality app
│   ├── models.py      # Interaction, Match models
│   ├── serializers.py # Dating API serializers
│   ├── views.py       # Dating views
│   └── urls.py        # Dating URLs
├── datingapp/         # Project settings
│   ├── settings.py    # Django settings
│   └── urls.py        # Main URL configuration
├── media/             # Uploaded files
├── manage.py          # Django management script
└── requirements.txt   # Python dependencies
```

## Development Notes

- The server uses SQLite for development (easy setup)
- CORS is enabled for frontend development
- JWT tokens expire in 60 minutes
- Sample data includes realistic profile information
- Profile images are stored in `media/uploads/`

## Troubleshooting

### Common Issues

1. **Migration errors**: Delete `db.sqlite3` and run migrations again
2. **CORS errors**: Check that `django-cors-headers` is installed and configured
3. **JWT errors**: Ensure token is included in Authorization header as `Bearer <token>`
4. **File upload errors**: Check that `MEDIA_ROOT` directory exists and is writable

### Reset Database

```bash
rm db.sqlite3
python manage.py makemigrations
python manage.py migrate
python manage.py create_sample_data
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (if available)
5. Submit a pull request

## License

This project is for educational purposes as part of the DevSoc IIT KGP workshop.
