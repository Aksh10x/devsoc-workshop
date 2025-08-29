from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from dating.models import Swipe, Match
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Create sample swipes and matches for testing'

    def handle(self, *args, **options):
        users = list(User.objects.all())
        
        if len(users) < 4:
            self.stdout.write(
                self.style.ERROR('Need at least 4 users to create sample interactions. Run create_sample_data first.')
            )
            return

        self.stdout.write('Creating sample swipes and matches...')
        
        swipes_created = 0
        matches_created = 0
        
        # Create some random swipes
        for i in range(20):
            user1 = random.choice(users)
            user2 = random.choice(users)
            
            # Don't swipe on yourself
            if user1.id == user2.id:
                continue
                
            # Don't create duplicate swipes
            if Swipe.objects.filter(user=user1, target=user2).exists():
                continue
            
            # Random like/pass (70% chance of like)
            is_like = random.random() < 0.7
            
            Swipe.objects.create(
                user=user1,
                target=user2,
                is_like=is_like
            )
            swipes_created += 1
            
            # If this was a like, check if the target also liked back
            if is_like and Swipe.objects.filter(user=user2, target=user1, is_like=True).exists():
                # Create a match if it doesn't exist
                try:
                    match = Match.create_sorted(user1, user2)
                    matches_created += 1
                    self.stdout.write(f"Created match between {user1.username} and {user2.username}")
                except:
                    pass  # Match might already exist
        
        # Create some guaranteed matches for testing
        guaranteed_matches = [
            ('alex_smith', 'emma_johnson'),
            ('mike_wilson', 'sarah_davis'),
            ('chris_brown', 'lisa_taylor'),
        ]
        
        for username1, username2 in guaranteed_matches:
            try:
                user1 = User.objects.get(username=username1)
                user2 = User.objects.get(username=username2)
                
                # Create mutual likes
                Swipe.objects.get_or_create(
                    user=user1, target=user2,
                    defaults={'is_like': True}
                )
                Swipe.objects.get_or_create(
                    user=user2, target=user1,
                    defaults={'is_like': True}
                )
                
                # Create match
                match = Match.create_sorted(user1, user2)
                matches_created += 1
                self.stdout.write(f"Created guaranteed match: {username1} ❤️ {username2}")
                
            except User.DoesNotExist:
                self.stdout.write(f"Users {username1} or {username2} not found")
                continue
            except:
                pass  # Match might already exist

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {swipes_created} swipes and {matches_created} matches!')
        )
        
        # Show some stats
        total_users = User.objects.count()
        total_swipes = Swipe.objects.count()
        total_matches = Match.objects.count()
        
        self.stdout.write('')
        self.stdout.write(self.style.WARNING('Database Statistics:'))
        self.stdout.write(f'Total Users: {total_users}')
        self.stdout.write(f'Total Swipes: {total_swipes}')
        self.stdout.write(f'Total Matches: {total_matches}')
        self.stdout.write('')
        self.stdout.write('Ready for testing! 🚀')
