touch .env
# Back-End Variables
echo "DATABASE_URL=$DATABASE_URL" >> .env
echo "FLASK_APP_KEY=$FLASK_APP_KEY" >> .env
echo "FLASK_APP=$FLASK_APP" >> .env
echo "FLASK_ENV=$FLASK_ENV" >> .env


# Front-End Variables
echo "BASENAME=$BASENAME" >> .env
echo "GOOGLE_API=$GOOGLE_API" >> .env
echo "TMDB_API=$TMDB_API" >> .env
echo "BACKEND_URL=$BACKEND_URL" >> .env
