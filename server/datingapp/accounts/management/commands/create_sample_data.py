from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from datetime import date, timedelta
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Create sample users for testing the dating app'

    def handle(self, *args, **options):
        # Sample data for users
        sample_users = [
            {
                'username': 'alex_smith',
                'email': 'alex@example.com',
                'password': 'password123',
                'first_name': 'Alex',
                'last_name': 'Smith',
                'bio': 'Love hiking, photography, and good coffee ☕',
                'gender': 'male',
                'birth_date': date(1995, 3, 15),
                'likes': ['photography', 'hiking', 'coffee', 'travel'],
                'cover_image_url': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'emma_johnson',
                'email': 'emma@example.com',
                'password': 'password123',
                'first_name': 'Emma',
                'last_name': 'Johnson',
                'bio': 'Yoga instructor who loves books and sunsets 🧘‍♀️',
                'gender': 'female',
                'birth_date': date(1997, 7, 22),
                'likes': ['yoga', 'reading', 'meditation', 'nature'],
                'cover_image_url': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'mike_wilson',
                'email': 'mike@example.com',
                'password': 'password123',
                'first_name': 'Mike',
                'last_name': 'Wilson',
                'bio': 'Fitness enthusiast and weekend chef 🍳',
                'gender': 'male',
                'birth_date': date(1993, 11, 8),
                'likes': ['fitness', 'cooking', 'movies', 'sports'],
                'cover_image_url': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'sarah_davis',
                'email': 'sarah@example.com',
                'password': 'password123',
                'first_name': 'Sarah',
                'last_name': 'Davis',
                'bio': 'Artist and dog lover seeking adventures 🎨🐕',
                'gender': 'female',
                'birth_date': date(1996, 1, 30),
                'likes': ['art', 'dogs', 'painting', 'music'],
                'cover_image_url': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'chris_brown',
                'email': 'chris@example.com',
                'password': 'password123',
                'first_name': 'Chris',
                'last_name': 'Brown',
                'bio': 'Tech geek who plays guitar in spare time 🎸',
                'gender': 'male',
                'birth_date': date(1994, 9, 12),
                'likes': ['technology', 'guitar', 'gaming', 'coding'],
                'cover_image_url': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'lisa_taylor',
                'email': 'lisa@example.com',
                'password': 'password123',
                'first_name': 'Lisa',
                'last_name': 'Taylor',
                'bio': 'Traveler and foodie exploring the world 🌍',
                'gender': 'female',
                'birth_date': date(1998, 4, 18),
                'likes': ['travel', 'food', 'photography', 'cultures'],
                'cover_image_url': 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'david_miller',
                'email': 'david@example.com',
                'password': 'password123',
                'first_name': 'David',
                'last_name': 'Miller',
                'bio': 'Musician and coffee shop owner ☕🎵',
                'gender': 'male',
                'birth_date': date(1992, 6, 25),
                'likes': ['music', 'coffee', 'business', 'concerts'],
                'cover_image_url': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'anna_garcia',
                'email': 'anna@example.com',
                'password': 'password123',
                'first_name': 'Anna',
                'last_name': 'Garcia',
                'bio': 'Dancer and wellness coach spreading positivity ✨',
                'gender': 'female',
                'birth_date': date(1995, 12, 3),
                'likes': ['dancing', 'wellness', 'positivity', 'fitness'],
                'cover_image_url': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'ryan_thomas',
                'email': 'ryan@example.com',
                'password': 'password123',
                'first_name': 'Ryan',
                'last_name': 'Thomas',
                'bio': 'Outdoor enthusiast and rock climbing instructor 🧗‍♂️',
                'gender': 'male',
                'birth_date': date(1991, 8, 14),
                'likes': ['climbing', 'outdoors', 'adventure', 'nature'],
                'cover_image_url': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'jessica_white',
                'email': 'jessica@example.com',
                'password': 'password123',
                'first_name': 'Jessica',
                'last_name': 'White',
                'bio': 'Writer and bookworm seeking deep conversations 📚',
                'gender': 'female',
                'birth_date': date(1997, 2, 28),
                'likes': ['writing', 'books', 'literature', 'poetry'],
                'cover_image_url': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'tom_anderson',
                'email': 'tom@example.com',
                'password': 'password123',
                'first_name': 'Tom',
                'last_name': 'Anderson',
                'bio': 'Chef and wine enthusiast creating culinary magic 🍷',
                'gender': 'male',
                'birth_date': date(1990, 10, 7),
                'likes': ['cooking', 'wine', 'culinary', 'restaurants'],
                'cover_image_url': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face'
            },
            {
                'username': 'maria_lopez',
                'email': 'maria@example.com',
                'password': 'password123',
                'first_name': 'Maria',
                'last_name': 'Lopez',
                'bio': 'Designer and plant parent with green fingers 🌱',
                'gender': 'female',
                'birth_date': date(1994, 5, 16),
                'likes': ['design', 'plants', 'sustainability', 'creativity'],
                'cover_image_url': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face'
            }
        ]

        self.stdout.write('Creating sample users...')
        
        created_count = 0
        for user_data in sample_users:
            # Check if user already exists
            if User.objects.filter(username=user_data['username']).exists():
                self.stdout.write(f"User {user_data['username']} already exists, skipping...")
                continue
            
            # Create user
            user = User.objects.create_user(
                username=user_data['username'],
                email=user_data['email'],
                password=user_data['password'],
                first_name=user_data['first_name'],
                last_name=user_data['last_name'],
                bio=user_data['bio'],
                gender=user_data['gender'],
                birth_date=user_data['birth_date'],
                likes=user_data['likes'],
                cover_image_url=user_data['cover_image_url']
            )
            created_count += 1
            self.stdout.write(f"Created user: {user.username}")

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} sample users!')
        )
        
        # Display login instructions
        self.stdout.write('')
        self.stdout.write(self.style.WARNING('Sample users created! You can login with:'))
        self.stdout.write('Username: alex_smith, Password: password123')
        self.stdout.write('Username: emma_johnson, Password: password123')
        self.stdout.write('Username: mike_wilson, Password: password123')
        self.stdout.write('...and so on for all users')
        self.stdout.write('')
        self.stdout.write('Happy testing! 💕')
