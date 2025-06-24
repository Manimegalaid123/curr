let select = document.querySelectorAll(".currency");
let btn = document.getElementById("btn");
let input = document.getElementById("input");

fetch('https://api.frankfurter.app/currencies')
  .then(res => res.json())
  .then(res => dropdown(res));

function dropdown(res) {
  let curr = Object.entries(res);
  for (let i = 0; i < curr.length; i++) {
    let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`;
    select[0].innerHTML += opt;
    select[1].innerHTML += opt;
  }
}

btn.addEventListener("click", () => {
  let curr1 = select[0].value;
  let curr2 = select[1].value;
  let inputValue = input.value;

  document.getElementById("error").innerText = "";
  document.getElementById("error1").innerText = "";

  if (inputValue === "")
    document.getElementById("error").innerText = " ⚠️Please enter a valid amount.";

  if (curr1 === curr2)
    document.getElementById("error1").innerText = " ⚠️Please select different currencies.";
  else {
    convertor(curr1, curr2, inputValue);
  }
});
document.getElementById('swapBtn').addEventListener('click', () => {
 
  const sel1 = select[0];
  const sel2 = select[1];
  const temp = sel1.value;
  sel1.value = sel2.value;
  sel2.value = temp;


  const inputRaw = input.value.trim();
  const amount = parseFloat(inputRaw) || 0;


  if (amount > 0) {
  
    document.getElementById("error").innerText = "";
    document.getElementById("error1").innerText = "";

    // Update input field to reflect swapped currencies
    input.value = `${amount} ${sel1.value}`;
    convertor(sel1.value, sel2.value, amount);
  }
});


function convertor(curr1, curr2, inputValue) {
  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?amount=${inputValue}&from=${curr1}&to=${curr2}`)
    .then(resp => resp.json())
    .then((data) => {
      document.getElementById('result').value = Object.values(data.rates)[0];
  }  ) }