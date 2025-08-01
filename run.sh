echo "iniciando la aplicacion de notas"

#inicio del backend
echo "Instalando las dependencias del backend que vamos a necesitar"
cd backend
./mvnw clean install
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..

#inicio del ffrontend
echo "Instalando las dependencias del frontend que vamos a necesitar"
cd frontend
npm install
npm start &
FRONTEND_PID=$!
cd ..

# Instrucciones finales
echo "---------------------------------------"
echo "✅ Aplicación iniciada con éxito."
echo "🌐 Frontend: http://localhost:3000"
echo "🛠  Backend: http://localhost:8081"
echo "Presiona Ctrl+C para detener ambos procesos."
echo "---------------------------------------"

wait $BACKEND_PID $FRONTEND_PID