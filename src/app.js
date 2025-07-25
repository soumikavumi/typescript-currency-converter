"use strict";
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertButton = document.getElementById("convert-btn");
const resultText = document.getElementById("result");
// Populate currency options
fetch("https://api.frankfurter.app/currencies")
    .then(res => res.json())
    .then(data => {
    const codes = Object.keys(data);
    for (let code of codes) {
        const optionFrom = document.createElement("option");
        optionFrom.value = code;
        optionFrom.textContent = code;
        fromCurrency.appendChild(optionFrom);
        const optionTo = document.createElement("option");
        optionTo.value = code;
        optionTo.textContent = code;
        toCurrency.appendChild(optionTo);
    }
    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
});
convertButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    if (isNaN(amount)) {
        resultText.textContent = "Please enter a valid number.";
        return;
    }
    if (from === to) {
        resultText.textContent = "Please choose different currencies.";
        return;
    }
    const query = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
    fetch(query)
        .then(res => res.json())
        .then(data => {
        const converted = data.rates[to];
        resultText.textContent = `${amount} ${from} = ${converted} ${to}`;
    });
});
