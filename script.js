async function fetchCryptoData() {
    try {
        // Получаем данные с CoinGecko API
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano,tether,solana,dogecoin,bnb');
        const data = await response.json();

        // Обновляем данные на странице
        // Bitcoin
        const btcPrice = data[0].current_price;
        document.getElementById('btc-price').textContent = `$${btcPrice.toLocaleString()}`;
        document.getElementById('btc-market-cap').textContent = `$${data[0].market_cap.toLocaleString()}`;
        document.getElementById('btc-high').textContent = `$${data[0].high_24h.toLocaleString()}`;
        updatePriceColor(document.getElementById('btc-price'), btcPrice);

        // Ethereum
        const ethPrice = data[1].current_price;
        document.getElementById('eth-price').textContent = `$${ethPrice.toLocaleString()}`;
        document.getElementById('eth-market-cap').textContent = `$${data[1].market_cap.toLocaleString()}`;
        document.getElementById('eth-high').textContent = `$${data[1].high_24h.toLocaleString()}`;
        updatePriceColor(document.getElementById('eth-price'), ethPrice);

        // Tether
        const usdtPrice = data[2].current_price;
        document.getElementById('usdt-price').textContent = `$${usdtPrice.toLocaleString()}`;
        document.getElementById('usdt-market-cap').textContent = `$${data[2].market_cap.toLocaleString()}`;
        document.getElementById('usdt-high').textContent = `$${data[2].high_24h.toLocaleString()}`;

        // Solana
        const solPrice = data[3].current_price;
        document.getElementById('sol-price').textContent = `$${solPrice.toLocaleString()}`;
        document.getElementById('sol-market-cap').textContent = `$${data[3].market_cap.toLocaleString()}`;
        document.getElementById('sol-high').textContent = `$${data[3].high_24h.toLocaleString()}`;

        // Dogecoin
        const dogePrice = data[5].current_price;
        document.getElementById('doge-price').textContent = `$${dogePrice.toLocaleString()}`;
        document.getElementById('doge-market-cap').textContent = `$${data[5].market_cap.toLocaleString()}`;
        document.getElementById('doge-high').textContent = `$${data[5].high_24h.toLocaleString()}`;
        
        // Cardano
        const adaPrice = data[4].current_price;
        document.getElementById('ada-price').textContent = `$${adaPrice.toLocaleString()}`;
        document.getElementById('ada-market-cap').textContent = `$${data[4].market_cap.toLocaleString()}`;
        document.getElementById('ada-high').textContent = `$${data[4].high_24h.toLocaleString()}`;


        // Топ Валют
        document.getElementById('top-btc-price').textContent = `$${btcPrice.toLocaleString()}`;
        document.getElementById('top-eth-price').textContent = `$${ethPrice.toLocaleString()}`;
        document.getElementById('top-usdt-price').textContent = `$${usdtPrice.toLocaleString()}`;

        // Обновляем графики
        addPriceToChart('btc', btcPrice);
        addPriceToChart('eth', ethPrice);

    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

function updatePriceColor(element, price) {
    if (price > 1000) {
        element.style.color = '#4A90E2';
    } else {
        element.style.color = '#E94E77';
    }
}

function addPriceToChart(crypto, price) {
    const chartId = `${crypto}-chart`;
    const chart = document.getElementById(chartId);
    
    // Создаем новый блок для графика
    const block = document.createElement('div');
    block.classList.add('block');
    
    // Масштабируем цену
    const maxHeight = 300; // максимальная высота для графика
    const height = (price / 60000) * maxHeight; // Пример масштаба
    block.style.height = `${height}px`;
    
    // Добавляем цену в блок
    const priceLabel = document.createElement('span');
    priceLabel.textContent = `$${price.toLocaleString()}`;
    block.appendChild(priceLabel);

    // Добавляем блок в график
    chart.appendChild(block);
}

function updateGraphAtHourly() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Проверяем, если время нового часа
    if (minute === 0) {
        fetchCryptoData(); // обновляем данные каждый час
    }
}

// Обновление данных каждый час
setInterval(updateGraphAtHourly, 60000); // Проверка каждый час (1 минута интервала)

// Инициализация данных при первом запуске
fetchCryptoData();
