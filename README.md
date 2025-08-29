# DevSoc Dating App Workshop

A comprehensive full-stack dating application built for educational purposes as part of the DevSoc IIT KGP workshop. This project demonstrates modern web development practices, including REST API design, React frontend development, and real-time user interactions.

## 🚀 Project Overview

This dating app features a **Django REST API backend** and a **React frontend** with Tinder-like swipe functionality, user authentication, match detection, and responsive design.

### Key Learning Objectives

- **Full-stack development** workflow
- **REST API** design and implementation
- **React** modern development patterns
- **Authentication** with JWT tokens
- **Database** design and relationships
- **Responsive UI/UX** principles
- **Animation libraries** integration

## 📱 Features

### Backend (Django)
- ✅ **User Authentication** (JWT-based)
- ✅ **Profile Management** with image uploads
- ✅ **Swipe Interactions** (like/pass tracking)
- ✅ **Match Detection** algorithm
- ✅ **REST API** endpoints
- ✅ **Sample Data** generation
- ✅ **Admin Interface**

### Frontend (React)
- ✅ **Swipe Interface** with drag gestures
- ✅ **Match Celebrations** with animations
- ✅ **Responsive Design** for all devices
- ✅ **Mobile Sidebar** navigation
- ✅ **Modern UI** with pink gradient theme
- ✅ **Real-time Updates**
- ✅ **Form Validation**

## 🛠️ Tech Stack

### Backend
- **Django 5.1** - Web framework
- **Django REST Framework** - API framework
- **JWT Authentication** - Token-based auth
- **SQLite** - Database
- **Pillow** - Image processing
- **CORS Headers** - Cross-origin requests

### Frontend
- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Icons** - Icon components
- **CSS3** - Modern styling

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ with UV package manager
- Node.js 16+ with npm
- Git (for cloning)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd devsoc-workshop
```

### 2. Setup Backend (Django)
```bash
# Navigate to server directory
cd server/datingapp

# Create virtual environment
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
uv pip install django djangorestframework djangorestframework-simplejwt django-cors-headers pillow

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create sample data for testing
python manage.py create_sample_data

# Start Django server
python manage.py runserver
```

Backend will be running at `http://localhost:8000`

### 3. Setup Frontend (React)
```bash
# Open new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Start React development server
npm start
```

Frontend will be running at `http://localhost:3000`

## 🧪 Testing the Application

### Sample User Credentials
After running `create_sample_data`, you can login with:
- **Username**: `alice_johnson`
- **Password**: `password123`

Or register a new account to start fresh.

### Test Scenarios

1. **Authentication Flow**
   - Register new user → Auto-login → Redirect to swipe

2. **Swipe Functionality**
   - Drag cards left/right
   - Use action buttons
   - Watch for match animations

3. **Mobile Experience**
   - Open developer tools
   - Test hamburger menu
   - Verify touch interactions

4. **API Integration**
   - Check network tab for API calls
   - Test token refresh
   - Verify CORS handling

## 📚 Detailed Documentation

- **[Server README](./server/README.md)** - Complete Django backend setup
- **[Client README](./client/README.md)** - Complete React frontend setup

## 🏗️ Project Structure

```
devsoc-workshop/
├── server/                 # Django Backend
│   ├── datingapp/
│   │   ├── accounts/      # Authentication app
│   │   ├── dating/        # Dating functionality app
│   │   ├── datingapp/     # Project settings
│   │   ├── media/         # Uploaded files
│   │   └── manage.py
│   └── README.md
├── client/                # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # State management
│   │   ├── utils/         # API utilities
│   │   ├── App.js         # Main app
│   │   └── App.css        # Global styles
│   ├── package.json
│   └── README.md
└── README.md              # This file
```

## 🎯 API Endpoints Overview

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/refresh/` - Token refresh
- `GET /api/auth/user/` - Get user profile

### Dating Features
- `GET /api/dating/users/` - Get potential matches
- `POST /api/dating/interact/` - Record swipe interaction
- `GET /api/dating/matches/` - Get user matches

### File Upload
- `POST /api/upload/` - Upload profile images

## 🎨 UI/UX Highlights

### Design Philosophy
- **Tinder-inspired** swipe interface
- **Modern gradients** with pink theme
- **Smooth animations** for all interactions
- **Mobile-first** responsive design
- **Intuitive navigation** with clear visual feedback

### Animation Features
- **Card swipe** animations with rotation
- **Match celebration** modal
- **Hover effects** on interactive elements
- **Loading states** with spinners
- **Smooth transitions** between pages

## 🔧 Development Tips

### Backend Development
```bash
# Reset database
rm db.sqlite3
python manage.py migrate
python manage.py create_sample_data

# Access admin panel
python manage.py createsuperuser
# Visit: http://localhost:8000/admin/

# Check API endpoints
# Visit: http://localhost:8000/api/
```

### Frontend Development
```bash
# Clear application state
localStorage.clear()

# Build for production
npm run build

# Analyze bundle size
npm run build && npx serve -s build
```

### Common Issues & Solutions

1. **CORS Errors**: Ensure django-cors-headers is installed and configured
2. **Token Expiration**: Implement refresh token logic
3. **Image Upload Issues**: Check media files configuration
4. **Mobile Layout**: Test on actual devices, not just browser dev tools

## 🎓 Workshop Learning Path

### For Beginners
1. **Understand the architecture** - How frontend and backend communicate
2. **Follow the setup** - Get both servers running
3. **Test basic functionality** - Register, login, swipe
4. **Explore the code** - Start with simple components

### For Intermediate
1. **API Integration** - Study how React calls Django APIs
2. **State Management** - Understand AuthContext pattern
3. **Animation Implementation** - Learn Framer Motion basics
4. **Responsive Design** - CSS Grid and Flexbox usage

### For Advanced
1. **Database Design** - Analyze models and relationships
2. **Authentication Flow** - JWT implementation details
3. **Performance Optimization** - Bundle analysis and code splitting
4. **Deployment Preparation** - Production build configuration

## 🚀 Deployment Considerations

### Backend (Django)
- Use PostgreSQL for production
- Configure environment variables
- Set up static/media file serving
- Enable HTTPS

### Frontend (React)
- Build optimized production bundle
- Configure proper routing
- Set up CDN for static assets
- Enable service workers for PWA

## 🤝 Contributing

This project is designed for educational purposes. Feel free to:
- **Fork** and experiment
- **Add features** for learning
- **Share improvements** with the community
- **Report issues** for better learning experience

## 📄 License

This project is created for educational purposes as part of the DevSoc IIT KGP workshop. Free to use for learning and non-commercial purposes.

## 🙏 Acknowledgments

- **DevSoc IIT KGP** for the workshop opportunity
- **Django** and **React** communities for excellent documentation
- **Framer Motion** for smooth animations
- **React Icons** for beautiful iconography

---

**Happy Coding! 💻💕**

*Built with ❤️ for learning full-stack development*
