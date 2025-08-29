# dating/urls.py
from django.urls import path
from .views import FeedView, SwipeView, MatchesListView

urlpatterns = [
    path("feed/", FeedView.as_view(), name="feed"),
    path("swipe/", SwipeView.as_view(), name="swipe"),
    path("matches/", MatchesListView.as_view(), name="matches"),
]
