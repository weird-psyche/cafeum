const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
    } else if (xmlhttp.readyState==4){
      document.getElementById('server-status').innerHTML="Szerver jelenleg OFFLINE, fiók, rendelés és egyéb funkciók nem működnek!";
    }
  };
  xmlhttp.open("GET","https://api-20nv4395y20947yv5n2y4v02y3v20n43v5273vy-ngrok-dev.eu.ngrok.io/api/cafeum/rendelesek",true);
  xmlhttp.setRequestHeader("ngrok-skip-browser-warning", "1");

  xmlhttp.send();
