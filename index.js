const net = require('net');

// Aternos server ma'lumotlari
const SERVER_IP = 'promcuz.aternos.me';
const SERVER_PORT = 21547;

// AFK botni qayta ulanish funksiyasi
function connect() {
    const client = new net.Socket();
    
    client.connect(SERVER_PORT, SERVER_IP, () => {
        console.log('✅ Serverga ulandi: ' + SERVER_IP + ':' + SERVER_PORT);
    });

    client.on('error', (err) => {
        console.error('❌ Xatolik:', err.message);
        reconnect();
    });

    client.on('close', () => {
        console.log('⚡ Ulanish yopildi. Qayta ulanish uchun tayyorlanmoqda...');
        reconnect();
    });

    client.on('end', () => {
        console.log('🛑 Ulanish tugadi. 5 soniyadan keyin qayta ulaniladi...');
        reconnect();
    });
}

// Qayta ulanish funksiyasi
function reconnect() {
    setTimeout(() => {
        console.log('🔄 Qayta ulanilmoqda...');
        connect();
    }, 5000); // 5 soniya kutadi
}

// Botni ishga tushiramiz
connect();
