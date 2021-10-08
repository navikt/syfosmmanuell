#!/bin/sh

if [[ -z "${SECRET_COOKIE_PASSWORD}" ]]; then
  export SECRET_COOKIE_PASSWORD=$(cat /secrets/syfosmmanuell/secret_cookie_password)
fi

exec "$@"
