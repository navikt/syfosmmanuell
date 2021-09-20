#!/bin/sh

export SECRET_COOKIE_PASSWORD=$(cat /secrets/syfosmmanuell/secret_cookie_password)

exec "$@"
