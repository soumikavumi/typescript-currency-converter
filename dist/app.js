"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convert-btn");
const swapBtn = document.getElementById("swap-btn");
const loading = document.getElementById("loading");
const errorText = document.getElementById("error");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
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
function convertCurrency() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield fetch(query);
            if (!response.ok) {
                throw new Error("API request failed");
            }
            const data = yield response.json();
            const converted = data.rates[to];
            result.textContent = amount + " " + from + " = " + converted + " " + to;
        }
        catch (error) {
            errorText.textContent = "Failed to fetch exchange rate. Please try again.";
        }
        finally {
            loading.classList.add("hidden");
        }
    });
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
