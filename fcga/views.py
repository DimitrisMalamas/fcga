from django.shortcuts import render

from django.shortcuts import get_object_or_404

from django.http import HttpResponseRedirect

from .models import Deck, Cards

from django.urls import reverse

from django.utils import timezone

from django.contrib.auth.models import User

from django.contrib.auth import authenticate, login, logout

from django.contrib.auth.decorators import login_required


def index(request):
    all_decks = Deck.objects.all()
    context = {'all_decks': all_decks}
    return render(request, 'fcga/index.html', context)

def deck(request, deck_id):
    dec = get_object_or_404(Deck, pk=deck_id)
    return render(request, 'fcga/deck.html', {'deck': dec})


@login_required(login_url='/fcga/login/')
def cdeck(request, deck_id = None):
    if request.method == 'POST':
        if request.user.is_authenticated():
            u = request.user
        if deck_id == None:
            dec2 = Deck()
            dec2.owner = u
            dec2.title = request.POST['title']
            dec2.category = request.POST['category']
            dec2.description = request.POST['description']
            dec2.deck_date = timezone.now()
            dec2.save()
            d = dec2.id
            return render(request, 'fcga/ccards.html', {'deck_id': d})
        else:
            dec2 = Deck.objects.get(pk = deck_id)
            dec2.title = request.POST['title']
            dec2.category = request.POST['category']
            dec2.description = request.POST['description']
            dec2.save()
            if request.user.is_authenticated():
                u = request.user
            decks = Deck.objects.filter(owner = u)
            return render(request, 'fcga/pdecks.html', {'deck': decks})
    else:
        return render(request, 'fcga/cdeck.html')

@login_required(login_url='/fcga/login/')
def pdecks(request, user_id):
    user = User.objects.get(pk=user_id)
    decks = Deck.objects.filter(owner = user)
    return render(request, 'fcga/pdecks.html', {'deck': decks})

@login_required(login_url='/fcga/login/')
def ccards(request, deck_id, cards_id = None):
    if request.method == 'POST':
        if cards_id == None:
            card = Cards()
            card.deck = Deck.objects.get(pk=deck_id)
            card.question = request.POST['question']
            card.answer = request.POST['answer']
            card.card_date = timezone.now()
            card.save()
            return render(request, 'fcga/ccards.html', {'deck_id': deck_id})
        else:
            card = Cards.objects.get(pk = cards_id)
            card.question = request.POST['question']
            card.answer = request.POST['answer']
            card.save()
            dec = Deck.objects.get(pk = deck_id)
            cards = Cards.objects.filter(deck = dec)
            context = {
                'id': dec.id,
                'title':dec.title,
                'category': dec.category,
                'description': dec.description,
                'cards': cards
            }
            return render(request, 'fcga/cdeck.html', context)
    else:
        return render(request, 'fcga/ccards.html', {'deck_id': deck_id})

@login_required(login_url='/fcga/login/')
def change_cards(request, cards_id):
    card = Cards.objects.get(pk = cards_id)
    deck = card.deck
    context = {
        'deck_id': deck.id,
        'id': card.id,
        'question':card.question,
        'answer': card.answer
    }
    return render(request, 'fcga/ccards.html', context)

@login_required(login_url='/fcga/login/')
def change_deck(request, deck_id):
    dec = Deck.objects.get(pk = deck_id)
    cards = Cards.objects.filter(deck = dec)
    context = {
        'id': dec.id,
        'title':dec.title,
        'category': dec.category,
        'description': dec.description,
        'cards': cards
    }
    return render(request, 'fcga/cdeck.html', context)

@login_required(login_url='/fcga/login/')
def del_deck(request, deck_id):
    deck = Deck.objects.get(pk = deck_id)
    deck.delete()
    if request.user.is_authenticated():
        u = request.user
    decks = Deck.objects.filter(owner = u)
    return render(request, 'fcga/pdecks.html', {'deck': decks})

@login_required(login_url='/fcga/login/')
def del_card(request, cards_id):
    card = Cards.objects.get(pk = cards_id)
    card.delete()
    deck = card.deck
    deck_id = deck.id
    return render(request, 'fcga/cdeck.html', {'id': deck_id})

def play(request, deck_id):
    card = Cards.objects.filter(deck_id = deck_id)
    return render(request, 'fcga/play.html', {'card': card})
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
