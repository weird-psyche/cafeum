let felhasznalo=0;
if(!isNaN(location.search[1]) && isNaN(location.search[2])) felhasznalo=location.search[1];
else if (!isNaN(location.search[1]) && !isNaN(location.search[2]) && isNaN(location.search[3])) felhasznalo=location.search[1]+location.search[2];
else if (!isNaN(location.search[1]) && !isNaN(location.search[2]) && !isNaN(location.search[3]) && isNaN(location.search[4])) felhasznalo=location.search[1]+location.search[2]+location.search[1]+location.search[3];

const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      let object = JSON.parse(this.responseText);
      for(let i=0;i<object.length;i++){
        if(object[i].vasarloId == felhasznalo){
          document.getElementById("vasarloNev").innerHTML=object[i].vasarloNev;
        }
      }
    } else if (xmlhttp.readyState==4){
      document.getElementById('server-status').innerHTML="Szerver jelenleg OFFLINE, fiók, rendelés és egyéb funkciók nem működnek!";
    }
  };
  xmlhttp.open("GET","https://api-20nv4395y20947yv5n2y4v02y3v20n43v5273vy-ngrok-dev.eu.ngrok.io/api/cafeum/vasarlok",true);
  xmlhttp.setRequestHeader("ngrok-skip-browser-warning", "1");

  xmlhttp.send();
