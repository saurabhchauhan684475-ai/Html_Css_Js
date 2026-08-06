function calculateTotal() {
  const ButtonElement = document.querySelector('.js_cost_input');
  let cost = Number(ButtonElement.value);

  if (cost <= 0) {
    document.querySelector('.js_total_cost').innerHTML =
      "Error: Cost must be greater than 0";
    ButtonElement.classList.add('error');
    return;
  }

  ButtonElement.classList.remove('error');

  if (cost < 40) {
    cost += 10;
  }

  document.querySelector('.js_total_cost').innerHTML = `$${cost}`;
}

function handlecostkeydown(event) {
  if (event.key === 'Enter') {
    calculateTotal();
  }
}