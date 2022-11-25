const form = document.getElementById("formulario");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);
document.getElementById("encontrado").style.display = "none";

async function load() {
  const productName = "aceite";
  const response = await fetch(
    `http://127.0.0.1:8000/productos?productName=${productName}`,
    {
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" }),
      mode: "cors",
    }
  );
  const data = await response.json();
  var tabla = document.getElementById("tabla");

  // console.log(data)
  // data.dataseries.forEach((element, index) => {
  //   /*
  //   lifted_index: 6
  //   prec_type: "none"
  //   */
  //   const rowIndex = document.createTextNode(index + 1);
  //   const liftedIndex = document.createTextNode(element.lifted_index);
  //   const precType = document.createTextNode(element.prec_type);
  //   const td1 = document.createElement("td");
  //   const td2 = document.createElement("td");
  //   const td3 = document.createElement("td");
  //   const tr = document.createElement("tr");

  //   td1.appendChild(rowIndex);
  //   td2.appendChild(liftedIndex);
  //   td3.appendChild(precType);

  //   tr.appendChild(td1);
  //   tr.appendChild(td2);
  //   tr.appendChild(td3);

  //   tabla.appendChild(tr);
  //   console.log(index);
  // });
  console.log(data);
}

function search() {
  document.getElementById("encontrado").style.display = "block";
  document.getElementById("buscar").style.display = "none";
  load();
}
