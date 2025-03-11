const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

// Array to populate the select tags with these countries
const countries = [
  {code:"USD",name:"United States Dollar"},
  {code:"INR",name:"Indian Rupee"},
]

// Showing countries from array to tag
countries.forEach((country)=>{
 const option1 = document.createElement('option');
 const option2 = document.createElement('option');

 option1.value = option2.value = country.code;
 option1.textContent = option2.textContent = `${country.code}(${country.name})`;

 fromCurrencyElement.appendChild(option1);
 toCurrencyElement.appendChild(option2);

 //setting default values of select tag 
 fromCurrencyElement.value = "USD";
 toCurrencyElement.value = "INR";
}); 
//function to get exchange rate using API
const getExchangeRate = async ()=>{
 const amount = parseFloat(fromAmountElement.value);
 const fromCurrency = fromCurrencyElement.value;

 const toCurrency = toCurrencyElement.value;
 resultElement.textContent = "Fetching Exchane Rates...";
 try{
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
 const data = await response.json();

 const conversionRate = data.rates[toCurrency];
 const convertedAmount = (amount *conversionRate).toFixed(2);

 if(typeof conversionRate === "undefined"){
  resultElement.textContent = "Exchange rate data is not available for selected country";
  convertedAmountElement = "";
 }
 else {
    convertedAmountElement.value = convertedAmount;
 resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
 }

 } catch(error){
  converterContainer.innerHTML = `<h2>Error while fetching exchange rates !!!</h2>`
 }
 // fetch data from API

}

// fetching exchange rate when user input the amount
fromAmountElement.addEventListener("input",getExchangeRate);
// fetching exchange rate when user input the amount
fromCurrencyElement.addEventListener("change",getExchangeRate);
toCurrencyElement.addEventListener("change",getExchangeRate);
window.addEventListener("load",getExchangeRate);