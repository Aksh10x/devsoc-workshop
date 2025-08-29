from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from dating.models import Swipe, Match

User = get_user_model()

class Command(BaseCommand):
    help = 'Clear all users, swipes, and matches from the database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--confirm',
            action='store_true',
            help='Confirm deletion of all data',
        )

    def handle(self, *args, **options):
        if not options['confirm']:
            self.stdout.write(
                self.style.WARNING('This will delete ALL users, swipes, and matches!')
            )
            self.stdout.write('Run with --confirm to proceed: python manage.py clear_all_data --confirm')
            return

        # Count before deletion
        user_count = User.objects.count()
        swipe_count = Swipe.objects.count()
        match_count = Match.objects.count()

        self.stdout.write(f'Found {user_count} users, {swipe_count} swipes, {match_count} matches')
        self.stdout.write('Deleting all data...')

        # Delete all data
        Swipe.objects.all().delete()
        Match.objects.all().delete()
        User.objects.all().delete()

        self.stdout.write(
            self.style.SUCCESS('Successfully deleted all users, swipes, and matches!')
        )
        self.stdout.write('Database is now clean. You can run create_sample_data to add new users.')
