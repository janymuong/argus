from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken


class JWTAuthenticationMiddleware:
    """Populate request.user from a SimpleJWT access token, if supplied."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.user = self._get_user_from_request(request)
        return self.get_response(request)

    @staticmethod
    def _get_user_from_request(request):
        header = request.headers.get("Authorization", "")
        if not header.lower().startswith("bearer "):
            return AnonymousUser()

        raw_token = header[7:].strip()
        if not raw_token:
            return AnonymousUser()

        try:
            token = AccessToken(raw_token)
            user_id = token.get("user_id")
            if user_id is None:
                return AnonymousUser()
            user = get_user_model().objects.get(pk=user_id)
            return user if user.is_active else AnonymousUser()
        except (TokenError, ValueError, TypeError, get_user_model().DoesNotExist):
            return AnonymousUser()
