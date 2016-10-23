from django.shortcuts import render

from django.shortcuts import get_object_or_404

from django.http import HttpResponseRedirect

from django.urls import reverse

from django.utils import timezone

from django.contrib.auth.models import User

from django.contrib.auth import authenticate, login, logout

from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, 'fcga/index.html')

def profile(request, user_id=None):
    if request.method == 'POST':
        if request.POST['password'] != request.POST['confirm-password']:
            return render(request, 'fcga/profile.html', {
                'first_name': request.POST['first-name'],
                'last_name': request.POST['last-name'],
                'username': request.POST['username'],
                'email': request.POST['email'],
                'error_message': 'Passwords do not match',
                'error_code': 'password_mismatch'
            })
        if user_id is not None:
            user = User.objects.get(pk=user_id)
        else:
            user = User.objects.create_user(request.POST['username'])
        user.first_name = request.POST['first-name']
        user.last_name = request.POST['last-name']
        user.email = request.POST['email']
        user.set_password(request.POST['password'])
        user.save()
        user = authenticate(username=request.POST['username'],
                            password=request.POST['password'])
        if user is not None:
            login(request, user)
        return HttpResponseRedirect(reverse('fcga:index'))
    else:
        if user_id is not None and request.user.id == user_id:
            context = {
                'first_name': request.user.first_name,
                'last_name': request.user.last_name,
                'username': request.user.username,
                'email': request.user.email
            }
        else:
            context = {
                'first_name': '',
                'last_name': '',
                'username': '',
                'email': ''
            }
    return render(request, 'fcga/profile.html', context)

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            dest = request.POST.get('next', reverse('fcga:index'))
            return HttpResponseRedirect(dest)
    return render(request, 'fcga/login.html')

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('fcga:index'))
