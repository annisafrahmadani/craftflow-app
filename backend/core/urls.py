from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import (
    dashboard,
    ProjectViewSet,
    TaskViewSet,
    JobApplicationViewSet
)

router = DefaultRouter()

router.register(
    "projects",
    ProjectViewSet
)

router.register(
    "tasks",
    TaskViewSet
)

router.register(
    "jobs",
    JobApplicationViewSet
)



urlpatterns = [
    path("", include(router.urls)),  
    path("dashboard/", dashboard),    
]
