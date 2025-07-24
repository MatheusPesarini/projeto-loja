echo "🚀 Starting backend with Drizzle..."

echo "📊 Running Drizzle migrations..."
npx drizzle-kit push

if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully!"
    
    echo "🏃 Starting the application..."
    npm run dev
else
    echo "❌ Migrations failed!"
    exit 1
fi