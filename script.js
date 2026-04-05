const sampleStocks = {
  AAPL: {
    name: "Apple Inc.",
    price: 198.12,
    pe: 30.5,
    growth: 7.4,
    debtToEquity: 1.72,
    roe: 152.4,
  },
  MSFT: {
    name: "Microsoft Corp.",
    price: 426.9,
    pe: 36.8,
    growth: 16.2,
    debtToEquity: 0.39,
    roe: 34.1,
  },
  GOOGL: {
    name: "Alphabet Inc.",
    price: 163.4,
    pe: 26.3,
    growth: 13.9,
    debtToEquity: 0.11,
    roe: 28.4,
  },
  NVDA: {
    name: "NVIDIA Corp.",
    price: 902.5,
    pe: 67.1,
    growth: 54.3,
    debtToEquity: 0.22,
    roe: 69.8,
  },
  TSLA: {
    name: "Tesla Inc.",
    price: 179.35,
    pe: 44.6,
    growth: 3.1,
    debtToEquity: 0.18,
    roe: 23.6,
  },
  AMZN: {
    name: "Amazon.com Inc.",
    price: 187.2,
    pe: 58.9,
    growth: 11.1,
    debtToEquity: 0.56,
    roe: 24.2,
  },
};

function getRecommendation({ pe, growth, debtToEquity, roe }) {
  let score = 0;

  if (pe > 0 && pe <= 25) score += 2;
  else if (pe <= 40) score += 1;
  else score -= 1;

  if (growth >= 15) score += 2;
  else if (growth >= 5) score += 1;
  else score -= 1;

  if (debtToEquity <= 0.5) score += 2;
  else if (debtToEquity <= 1.5) score += 1;
  else score -= 1;

  if (roe >= 18) score += 2;
  else if (roe >= 10) score += 1;
  else score -= 1;

  if (score >= 6) return { label: "Buy", className: "buy", score };
  if (score >= 3) return { label: "Hold", className: "hold", score };
  return { label: "Sell", className: "sell", score };
}

function renderResult(container, title, stock, recommendation) {
  container.classList.remove("hidden");
  container.innerHTML = `
    <h3>${title}</h3>
    <div class="metrics">
      <div><strong>Price:</strong> $${stock.price?.toFixed(2) ?? "—"}</div>
      <div><strong>P/E:</strong> ${stock.pe}</div>
      <div><strong>Growth:</strong> ${stock.growth}%</div>
      <div><strong>D/E:</strong> ${stock.debtToEquity}</div>
      <div><strong>ROE:</strong> ${stock.roe}%</div>
      <div><strong>Score:</strong> ${recommendation.score}/8</div>
    </div>
    <p>
      Recommendation:
      <span class="badge ${recommendation.className}">${recommendation.label}</span>
    </p>
  `;
}

const stockForm = document.getElementById("stock-form");
const stockResult = document.getElementById("stock-result");
const customForm = document.getElementById("custom-form");
const customResult = document.getElementById("custom-result");

stockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const symbol = document.getElementById("symbol").value;
  const stock = sampleStocks[symbol];

  if (!stock) {
    stockResult.classList.remove("hidden");
    stockResult.innerHTML = "<p>Please choose a valid stock ticker.</p>";
    return;
  }

  const recommendation = getRecommendation(stock);
  renderResult(stockResult, `${stock.name} (${symbol})`, stock, recommendation);
});

customForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const stock = {
    price: NaN,
    pe: Number(document.getElementById("pe").value),
    growth: Number(document.getElementById("growth").value),
    debtToEquity: Number(document.getElementById("de").value),
    roe: Number(document.getElementById("roe").value),
  };

  const recommendation = getRecommendation(stock);
  renderResult(customResult, "Your Custom Stock Analysis", stock, recommendation);
});
