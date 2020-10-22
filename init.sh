# For exporting injected vault secrets as environment variables

export SESSION_KEY=$(cat /secrets/default/syfosmmanuell/session_key)
export CLIENT_ID=$(cat /secrets/azuread/syfosmmanuell/client_id)
export CLIENT_SECRET=$(cat /secrets/azuread/syfosmmanuell/client_secret)
export DOWNSTREAM_API_CLIENT_ID=$(cat /secrets/azuread/syfosmmanuell-backend/client_id)