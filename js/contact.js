function KontaktKuldes() {
  const form = document.getElementById("ContactForm");
  const formData = {
    TeljesNev: form.name.value,
    Email: form.email.value,
    Tema: form.subject.value,
    Uzenet: form.message.value,
  };

  //console.log(JSON.stringify(formData));

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      console.log("Sikeres POST keres!");
    } else if(xmlhttp.readyState==4){
      console.log("Hiba a POST keres soran: ",xmlhttp.status);
    }
  };

// lokalis szerver:
//xmlhttp.open("POST","https://localhost:7032/api/cafeum/kontakt",true);
//xmlhttp.setRequestHeader("Content-Type", "application/json");

// online szerver:
xmlhttp.open("POST","https://api-20nv4395y20947yv5n2y4v02y3v20n43v5273vy-ngrok-dev.eu.ngrok.io/api/cafeum/kontakt",true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("ngrok-skip-browser-warning", "1");



xmlhttp.send(JSON.stringify(formData));

//alert("Sikeres küldés!");
}
