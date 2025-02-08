docker compose up -d

echo "Waiting for worker container to be ready..."
sleep 10 

vitest

docker compose down