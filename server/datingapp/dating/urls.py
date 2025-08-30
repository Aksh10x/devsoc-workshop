# dating/urls.py
from django.urls import path
from .views import FeedView, SwipeView, MatchesListView

urlpatterns = [
    path("feed/", FeedView.as_view(), name="feed"),    # swipe feed (paginated small batch)
    path("swipe/", SwipeView.as_view(), name="swipe"),  # submit a swipe action (like/pass)
    path("matches/", MatchesListView.as_view(), name="matches"),  # list of user's matches
]
