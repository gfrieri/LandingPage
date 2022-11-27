const OLIMPICA_URL = "https://www.olimpica.com/";
const JUMBO_URL = "https://www.tiendasjumbo.co/";
const D1_URL = "https://domicilios.tiendasd1.com/search?name=";

const form = document.getElementById("formulario");
function handleForm(event) {
  event.preventDefault();
}

form.addEventListener("submit", handleForm);

document.getElementById("encontrado").style.display = "none";

const createAnchoredLink = (storeName, productName) => {
  if (storeName === "olimpica") return `${OLIMPICA_URL}${productName}`;
  if (storeName === "jumbo") return `${JUMBO_URL}${productName}`;
  if (storeName === "d1") return `${D1_URL}${productName}`;
  return "#";
};

const createAnchoredElement = (storeName, productName) => {
  const a = document.createElement("a");
  a.href = createAnchoredLink(storeName, productName);
  a.target = "_blank";
  const img = document.createElement("img");
  img.setAttribute("src", `img/${storeName}.jpg`);
  img.classList.add("store-logo");
  a.appendChild(img);
  return a;
};

async function load() {
  const productName = document.getElementById("query").value ?? "";
  const response = await fetch(
    `http://127.0.0.1:8000/productos?productName=${productName}`,
    {
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" }),
      withCredentials: false,
    }
  );
  const data = await response.json();
  var div = document.getElementById("encontrado");

  const table = document.createElement("table");
  table.id = "tabla";
  table.classList.add("tabla");
  const headerTr = document.createElement("tr");
  const headerName = document.createElement("td");
  const headerPrice = document.createElement("td");
  const headerStore = document.createElement("td");
  const nameText = document.createTextNode("Nombre");
  const priceText = document.createTextNode("Precio");
  const storeText = document.createTextNode("Tienda");
  headerName.appendChild(nameText);
  headerPrice.appendChild(priceText);
  headerStore.appendChild(storeText);

  headerTr.appendChild(headerName);
  headerTr.appendChild(headerPrice);
  headerTr.appendChild(headerStore);

  table.appendChild(headerTr);

  data.forEach((element) => {
    const name = document.createTextNode(element.nombre);
    const price = document.createTextNode(element.precio);
    const store = createAnchoredElement(element.tienda, element.nombre);

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const tr = document.createElement("tr");

    td1.appendChild(name);
    td2.appendChild(price);
    td3.appendChild(store);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    table.appendChild(tr);
  });
  div.appendChild(table);
}

function search() {
  document.getElementById("encontrado").style.display = "block";
  document.getElementById("buscar").style.display = "none";
  load();
}

function goBack() {
  document.getElementById("encontrado").style.display = "none";
  document.getElementById("buscar").style.display = "block";
  document.getElementById("tabla").remove();
}
