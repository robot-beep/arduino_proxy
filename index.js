const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(express.json()); // Para procesar datos JSON en las solicitudes entrantes

app.all('/proxy', (req, res) => {
    console.log('redireccionando a servidor backend');
    const body = req.body; 
    console.log(body);

    // Reenviar la solicitud al servidor HTTPS
    proxy.web(req, res, { 
        target: 'https://farmacia-popular-backend.onrender.com/venta/any',
        changeOrigin: true, // Necesario para sitios virtuales alojados y SSL
        secure: false // Puedes configurarlo en true si estás seguro del certificado SSL del servidor de destino
    });
});

const PORT = 3000; // Puedes cambiar el puerto si es necesario
app.listen(PORT, () => {
    console.log(`Proxy escuchando en el puerto ${PORT}`);
});
