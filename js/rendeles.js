let kosar = [];
let termektabla = [];
let rendelesszam=0;
let felhasznalo=0;
let vegosszeg=0;
if(!isNaN(location.search[1]) && isNaN(location.search[2])) felhasznalo=location.search[1];
else if (!isNaN(location.search[1]) && !isNaN(location.search[2]) && isNaN(location.search[3])) felhasznalo=location.search[1]+location.search[2];
else if (!isNaN(location.search[1]) && !isNaN(location.search[2]) && !isNaN(location.search[3]) && isNaN(location.search[4])) felhasznalo=location.search[1]+location.search[2]+location.search[1]+location.search[3];
let kvneve="";
function Kosarba(kvid) {
  //alert(felhasznalo);
  const data = {
    termekId: kvid,
    vasarloId: felhasznalo*1,
    rendelesszam: rendelesszam,
    mennyiseg: 1,
  };
  kosar.push(data);
  console.log(kosar);

  let szoveg="<tbody>"
  let j=0;
  for(let i=0;i<kosar.length;i++)
    {
      szoveg+="<tr style='text-align: left;'><td>"
      for(j=0;j<termektabla.length;j++)
      {
        if(kosar[i].termekId == termektabla[j].termekId){
          kvneve=termektabla[j].termekNev;
          break;
        }
      }

      //szoveg+="<button class='btn btn-dark rounded-pill btn-x' onclick='RendelesKi("+i+");'><img src='img/btn-x.png'></img></button>";
      szoveg+="<img src='img/btn-x.png' onclick='RendelesKi("+i+")' class='btn-dark btn-x'></img>"
      szoveg+=kvneve+"<br> - "+termektabla[j].termekAr+"Ft";
      szoveg+="</td></tr>";
    }
  vegosszeg+=termektabla[j].termekAr*1;
  szoveg+="</tbody>";
  szoveg+="<p>Végösszeg: "+vegosszeg+"Ft</p>";
  szoveg+="<button class='btn btn-dark py-2 px-2 m-2' onclick='RendelesLeadas()'>Rendelés leadása</button>";
  document.getElementById("tablakint").innerHTML=szoveg;
}

function RendelesKi(index) {
  //alert("gyasz");
  let j=0;
  for(let i=0;i<kosar.length;i++)
  {
    if(kosar[index]==kosar[i]){
      for(j=0;j<termektabla.length;j++)
        {
          if(kosar[index].termekId == termektabla[j].termekId){
            vegosszeg-=termektabla[j].termekAr*1;
            break;
          }
        }
      kosar.splice(index,1);
      break;
    }
  }
  let szoveg="<tbody>"
  for(let i=0;i<kosar.length;i++)
    {
      szoveg+="<tr style='text-align: left;'><td>"
      for(j=0;j<termektabla.length;j++)
      {
        if(kosar[i].termekId == termektabla[j].termekId){
          kvneve=termektabla[j].termekNev;
          break;
        }
      }
      //szoveg+="<button class='btn_delete' onclick='RendelesKi("+i+");'></button>"
      szoveg+="<img src='img/btn-x.png' onclick='RendelesKi("+i+")' class='btn-dark btn-x'></img>"
      szoveg+=kvneve+"<br> - "+termektabla[j].termekAr+"Ft</td></tr>";
    }

  szoveg+="</tbody>"
  szoveg+="<p>Végösszeg: "+vegosszeg+"Ft</p>";
  szoveg+="<button class='btn btn-dark py-2 px-2 m-2' onclick='RendelesLeadas()'>Rendelés leadása</button>";
  document.getElementById("tablakint").innerHTML=szoveg;
}

function RendelesLeadas() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
			console.log("Sikeres POST keres!");
		} else if(xmlhttp.readyState==4){
			console.log("Hiba a POST keres soran: "+xmlhttp.status);
		}
	};
      // lokalis szerver:
      //xmlhttp.open("POST","https://localhost:7032/api/cafeum/rendelesek",true);
      //xmlhttp.setRequestHeader("Content-Type", "application/json");

      // online szerver:
      xmlhttp.open("POST","https://api-20nv4395y20947yv5n2y4v02y3v20n43v5273vy-ngrok-dev.eu.ngrok.io/api/cafeum/rendelesek",true);
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.setRequestHeader("ngrok-skip-browser-warning", "1");

      xmlhttp.send(JSON.stringify(kosar));
  kosar=[];
  let szoveg="<p>Sikeres rendelés!</p>"
  szoveg+="<button class='btn btn-dark py-2 px-2 m-2' onclick='RendelesKesz();'>Ok!</button>";
  document.getElementById("tablakint").innerHTML=szoveg;
}

function RendelesKesz() {
  const xmlhttp2 = new XMLHttpRequest();
  xmlhttp2.onreadystatechange = function(){
    if(this.readyState==4 && this.status==200){
      const objektum2 = JSON.parse(this.responseText);
      //console.log(objektum2);

      for(let i=0;i<objektum2.length;i++){
        if(objektum2[i].rendelesszam>rendelesszam){
          rendelesszam=objektum2[i].rendelesszam;
        }
      }
      rendelesszam++;
      //alert(rendelesszam);
    }
  }

  // lokalis szerver:
      //xmlhttp2.open("GET","https://localhost:7032/api/cafeum/rendelesek",true);

      // online szerver:
      xmlhttp2.open("GET","https://api-20nv4395y20947yv5n2y4v02y3v20n43v5273vy-ngrok-dev.eu.ngrok.io/api/cafeum/rendelesek",true);
      xmlhttp2.setRequestHeader("ngrok-skip-browser-warning", "1");

      xmlhttp2.send();
  document.getElementById("tablakint").innerHTML="Üres";
}

window.onload = function () {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if(this.readyState==4 && this.status==200){
      const object = JSON.parse(this.responseText);
      //console.log(object);
      for(let i=0;i<object.length;i++)
      {
        termektabla.push(object[i]);
      }
    }
  }
      // lokalis szerver:
      //xmlhttp.open("GET","https://localhost:7032/api/cafeum/termek",true);

      // online szerver:
      xmlhttp.open("GET","https://api-20nv4395y20947yv5n2y4v02y3v20n43v5273vy-ngrok-dev.eu.ngrok.io/api/cafeum/termek",true);
      xmlhttp.setRequestHeader("ngrok-skip-browser-warning", "1");

      xmlhttp.send();


  const xmlhttp2 = new XMLHttpRequest();
  xmlhttp2.onreadystatechange = function(){
    if(this.readyState==4 && this.status==200){
      const objektum2 = JSON.parse(this.responseText);
      //console.log(objektum2);

      for(let i=0;i<objektum2.length;i++){
        if(objektum2[i].rendelesszam>rendelesszam){
          rendelesszam=objektum2[i].rendelesszam;
        }
      }
      rendelesszam++;
      //alert(rendelesszam);
    }
  }

      // lokalis szerver:
      //xmlhttp2.open("GET","https://localhost:7032/api/cafeum/rendelesek",true);

      // online szerver:
      xmlhttp2.open("GET","https://api-20nv4395y20947yv5n2y4v02y3v20n43v5273vy-ngrok-dev.eu.ngrok.io/api/cafeum/rendelesek",true);
      xmlhttp2.setRequestHeader("ngrok-skip-browser-warning", "1");

      xmlhttp2.send();

  document.getElementById('tablakint').innerHTML="<tbody><tr>Üres<tr></tbody>"
}

