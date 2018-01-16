function localtunnel {
    lt -s dc68d4664 --port 8000
}
until localtunnel; do 
echo "localtunnel server crashed"
sleep 2
done