#!/bin/zsh
client_id_file="/secrets/azuread/syfosmmanuell/client_id"
while IFS= read -r line
do
    echo "$line"
    echo "export CLIENT_ID=$line" >> envFile
done <"$client_id_file"

client_secret_file="/secrets/azuread/syfosmmanuell/client_secret"
while IFS= read -r line
do
    echo "$line"
    echo "export CLIENT_SECRET=$line" >> envFile
done <"$client_secret_file"

backend_client_id_file="/secrets/azuread/syfosmmanuell-backend/client_id"
while IFS= read -r line
do
    echo "$line"
    echo "export DOWNSTREAM_API_CLIENT_ID=$line" >> envFile
done <"$backend_client_id_file"

nodemon server.js