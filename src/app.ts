const amountInput = document.getElementById("amount") as HTMLInputElement;
const fromCurrency = document.getElementById("from-currency") as HTMLSelectElement;
const toCurrency = document.getElementById("to-currency") as HTMLSelectElement;
const result = document.getElementById("result") as HTMLParagraphElement;
const convertBtn = document.getElementById("convert-btn") as HTMLButtonElement;
const swapBtn = document.getElementById("swap-btn") as HTMLButtonElement;
const loading = document.getElementById("loading") as HTMLDivElement;
const errorText = document.getElementById("error") as HTMLParagraphElement;
const fromFlag = document.getElementById("from-flag") as HTMLImageElement;
const toFlag = document.getElementById("to-flag") as HTMLImageElement;

const currencies = ["USD", "EUR", "GBP", "CHF", "JPY", "INR"];

function populateSelects() {
    currencies.forEach(code => {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        option1.value = option2.value = code;
        option1.text = option2.text = code;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });
    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
    updateFlags();
}

function updateFlags() {
    fromFlag.src = "https://flagsapi.com/" + fromCurrency.value.slice(0, 2) + "/flat/32.png";
    toFlag.src = "https://flagsapi.com/" + toCurrency.value.slice(0, 2) + "/flat/32.png";
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        result.textContent = "";
        errorText.textContent = "Please enter a valid amount.";
        return;
    }

    const query = "https://api.frankfurter.app/latest?amount=" + amount + "&from=" + from + "&to=" + to;

    loading.classList.remove("hidden");
    result.textContent = "";
    errorText.textContent = "";

    try {
        const response = await fetch(query);
        if (!response.ok) {
            throw new Error("API request failed");
        }
        const data = await response.json();
        const converted = data.rates[to];
        result.textContent = amount + " " + from + " = " + converted + " " + to;
    } catch (error) {
        errorText.textContent = "Failed to fetch exchange rate. Please try again.";
    } finally {
        loading.classList.add("hidden");
    }
}

function swapCurrencies() {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    updateFlags();
}

populateSelects();
convertBtn.addEventListener("click", convertCurrency);
swapBtn.addEventListener("click", swapCurrencies);
fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);