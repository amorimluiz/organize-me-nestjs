source ./.env

if [ "$ENV" = "development" ]; then
    echo "Running in development mode"
    npm run start:dev
else
    echo "Running in production mode"
    npm run start:prod
fi
