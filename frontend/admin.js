async function loadOrders() {
  const res = await fetch("http://localhost:5000/api/orders");
  const orders = await res.json();
  const dash = document.getElementById("dashboard");
  dash.innerHTML = "<h2>Orders:</h2>" + JSON.stringify(orders, null, 2);
}

loadOrders();
