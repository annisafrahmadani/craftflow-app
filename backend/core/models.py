from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=255)

    category = models.CharField(
        max_length=100
    )

    description = models.TextField(
        blank=True
    )

    progress = models.IntegerField(
        default=0
    )

    deadline = models.DateField(
        null=True,
        blank=True
    )

    is_completed = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICES = [
        ("todo", "To Do"),
        ("progress", "In Progress"),
        ("done", "Completed"),
    ]

    title = models.CharField(
        max_length=255
    )

    description = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="todo",
    )

    deadline = models.DateField(
        null=True,
        blank=True
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="tasks",
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


class JobApplication(models.Model):
    STATUS_CHOICES = [
        ("applied", "Applied"),
        ("screening", "Screening"),
        ("assessment", "Assessment"),
        ("interview", "Interview"),
        ("offering", "Offering"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    ]

    company_name = models.CharField(
        max_length=255
    )

    job_title = models.CharField(
        max_length=255
    )

    employment_type = models.CharField(
        max_length=100
    )

    location = models.CharField(
        max_length=255
    )

    salary = models.CharField(
        max_length=100,
        blank=True
    )

    source = models.CharField(
        max_length=255,
        blank=True
    )

    application_link = models.URLField(
        blank=True
    )

    follow_up_date = models.DateField(
        null=True,
        blank=True
    )

    priority = models.CharField(
        max_length=50,
        default="Medium"
    )

    next_action = models.CharField(
        max_length=255,
        blank=True
    )

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="applied"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.company_name} - {self.job_title}"