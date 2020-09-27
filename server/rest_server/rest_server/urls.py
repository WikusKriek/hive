from django.conf.urls import include, url
from django.contrib import admin
from restapp import views
from django.urls import path
from rest_framework import routers

from django.urls import path
from restapp import views

urlpatterns = [
    path('users/', views.UserList)
]

urlpatterns = [
url(r'^admin/', admin.site.urls),
url(r'^users/', views.UserList.as_view()),
url(r'^login/', views.Login.as_view()),
url(r'^assignments/', views.Assignments.as_view()),
url(r'^announcements/', views.Announcements.as_view()),
url(r'^announcementdetails/', views.AnnouncementDetails.as_view()),
url(r'^assignmentdetails/', views.AssignmentDetails.as_view()),
url(r'^balanceresults/', views.BalanceResults.as_view()),
url(r'^auth/', views.auth.as_view()),
url(r'^userdetails/', views.userDetails.as_view()),
]
