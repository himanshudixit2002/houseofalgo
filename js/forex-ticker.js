/**
 * House of Algo's - Forex Ticker JavaScript
 * This file contains functionality for the forex ticker
 */

// Currency pairs data
const currencyPairs = [
    { name: "EUR/USD", value: "1.1234", change: "+0.0023", trend: "up" },
    { name: "GBP/USD", value: "1.2345", change: "-0.0018", trend: "down" },
    { name: "USD/JPY", value: "110.12", change: "+0.25", trend: "up" },
    { name: "AUD/USD", value: "0.7890", change: "-0.0032", trend: "down" },
    { name: "USD/CAD", value: "1.2765", change: "+0.0043", trend: "up" },
    { name: "NZD/USD", value: "0.7123", change: "-0.0021", trend: "down" },
    { name: "EUR/GBP", value: "0.8567", change: "+0.0012", trend: "up" },
    { name: "EUR/JPY", value: "129.87", change: "-0.32", trend: "down" },
    { name: "GBP/JPY", value: "151.65", change: "+0.45", trend: "up" },
    { name: "AUD/JPY", value: "86.92", change: "-0.18", trend: "down" },
    { name: "USD/CHF", value: "0.9234", change: "+0.0015", trend: "up" },
    { name: "EUR/CHF", value: "1.0943", change: "-0.0015", trend: "down" }
];

// Initialize forex ticker
function initForexTicker() {
    const tickerElement = document.getElementById('forexTicker');
    if (!tickerElement) return;
    
    // Clear existing content
    tickerElement.innerHTML = '';
    
    // Add currency pairs
    currencyPairs.forEach(pair => {
        const pairElement = document.createElement('div');
        pairElement.className = 'currency-pair';
        
        const nameElement = document.createElement('div');
        nameElement.className = 'currency-name';
        nameElement.textContent = pair.name;
        
        const valueContainer = document.createElement('div');
        valueContainer.className = `currency-value ${pair.trend}`;
        
        const valueText = document.createElement('span');
        valueText.textContent = pair.value;
        
        const trendIcon = document.createElement('i');
        trendIcon.className = pair.trend === 'up' ? 'fas fa-caret-up' : 'fas fa-caret-down';
        
        const changeElement = document.createElement('span');
        changeElement.className = 'currency-change';
        changeElement.textContent = pair.change;
        
        valueContainer.appendChild(valueText);
        valueContainer.appendChild(trendIcon);
        valueContainer.appendChild(changeElement);
        
        pairElement.appendChild(nameElement);
        pairElement.appendChild(valueContainer);
        
        tickerElement.appendChild(pairElement);
    });
    
    // Clone all items to ensure continuous scrolling
    const originalItems = Array.from(tickerElement.children);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        tickerElement.appendChild(clone);
    });
}

// Update currency values
function updateCurrencyValues() {
    const pairs = document.querySelectorAll('.currency-pair');
    
    pairs.forEach(pair => {
        const valueElement = pair.querySelector('.currency-value span:first-child');
        const trendIcon = pair.querySelector('.currency-value i');
        const changeElement = pair.querySelector('.currency-change');
        const valueContainer = pair.querySelector('.currency-value');
        
        if (valueElement && trendIcon && changeElement && valueContainer) {
            const currentValue = parseFloat(valueElement.textContent);
            const fluctuation = (Math.random() - 0.5) * 0.01;
            const newValue = (currentValue + fluctuation).toFixed(4);
            const isUp = fluctuation >= 0;
            
            // Add animation class
            valueElement.classList.add(isUp ? 'changing-up' : 'changing-down');
            
            // Update values
            setTimeout(() => {
                valueElement.textContent = newValue;
                trendIcon.className = isUp ? 'fas fa-caret-up' : 'fas fa-caret-down';
                changeElement.textContent = `${isUp ? '+' : '-'}${Math.abs(fluctuation).toFixed(4)}`;
                valueContainer.className = `currency-value ${isUp ? 'up' : 'down'}`;
                
                // Remove animation class
                setTimeout(() => {
                    valueElement.classList.remove('changing-up', 'changing-down');
                }, 500);
            }, 500);
        }
    });
}

// Initialize ticker on load
document.addEventListener('DOMContentLoaded', () => {
    initForexTicker();
    
    // Update values every 5 seconds
    setInterval(updateCurrencyValues, 5000);
    
    // Pause animation on hover
    const tickerContainer = document.querySelector('.forex-ticker-container');
    if (tickerContainer) {
        const ticker = document.querySelector('.forex-ticker');
        
        tickerContainer.addEventListener('mouseenter', () => {
            ticker.style.animationPlayState = 'paused';
        });
        
        tickerContainer.addEventListener('mouseleave', () => {
            ticker.style.animationPlayState = 'running';
        });
    }
});