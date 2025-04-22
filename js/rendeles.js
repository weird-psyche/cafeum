let kosar = [];
let termektabla = [];
let rendelesszam=0;
let felhasznalo=location.search[1];
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
  /*
  let szoveg="<ul>";
  let kvneve="";
  for(let i=0;i<kosar.length;i++)
  {
    szoveg+="<li>"
    for(let j=0;j<termektabla.length;j++)
    {
      if(kosar[i].termekId == termektabla[j].termekId) kvneve=termektabla[j].termekNev;
    }
    szoveg+=kvneve+"</li>";
  }
  szoveg+="</ul>";
  */

  let szoveg="<tbody>"
  for(let i=0;i<kosar.length;i++)
    {
      szoveg+="<tr><td>"
      for(let j=0;j<termektabla.length;j++)
      {
        if(kosar[i].termekId == termektabla[j].termekId) kvneve=termektabla[j].termekNev;
      }
      szoveg+="<button class='btn_delete' onclick='RendelesKi("+i+");'></button>"
      szoveg+=kvneve+"</td></tr>";
    }
  szoveg+="</tbody>"
  szoveg+="<button class='btn btn-dark py-2 px-2 m-2' onclick='RendelesLeadas()'>Rendelés leadása</button>";
  document.getElementById("tablakint").innerHTML=szoveg;
}

function RendelesKi(index) {
  //alert("gyasz");
  for(let i=0;i<kosar.length;i++)
  {
    if(kosar[index]==kosar[i]) kosar.splice(index,1);
  }
  let szoveg="<tbody>"
  for(let i=0;i<kosar.length;i++)
    {
      szoveg+="<tr><td>"
      for(let j=0;j<termektabla.length;j++)
      {
        if(kosar[i].termekId == termektabla[j].termekId) kvneve=termektabla[j].termekNev;
      }
      szoveg+="<button class='btn_delete' onclick='RendelesKi("+i+");'></button>"
      szoveg+=kvneve+"</td></tr>";
    }
  szoveg+="</tbody>"
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
  xmlhttp.open("POST","https://localhost:7032/api/cafeum/rendelesek", true);
  //xmlhttp.open("POST", "https://7e2c-80-99-39-238.ngrok-free.app/api/cafeum/rendelesek", true);
  xmlhttp.setRequestHeader("Content-Type","application/json");

  //if(kosar[1] != null) xmlhttp.send(JSON.stringify(kosar[0]));
  //else xmlhttp.send(JSON.stringify(kosar));

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

  xmlhttp2.open("GET","https://localhost:7032/api/cafeum/rendelesek",true);
  //xmlhttp2.open("GET","https://7e2c-80-99-39-238.ngrok-free.app/api/cafeum/rendelesek", true);
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
      //console.log(termektabla[0].termekId)
      /*let tab="<table class='table table-stripped>'"
      for(let i=0;i<object.length;i++){
        tab+="<tr><td>"+object[i].termekNev+"</td><td>"+object[i].termekAr+"</td></tr>";
      }
      tab+="</table>";*/
      //document.getElementById("tablakint").innerHTML=tab;
    }
  }
  xmlhttp.open("GET","https://localhost:7032/api/cafeum/termek",true);
  //xmlhttp.open("GET","https://7e2c-80-99-39-238.ngrok-free.app/api/cafeum/termek",true);
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

  xmlhttp2.open("GET","https://localhost:7032/api/cafeum/rendelesek",true);
  //xmlhttp2.open("GET","https://7e2c-80-99-39-238.ngrok-free.app/api/cafeum/rendelesek",true);
  xmlhttp2.send();

  document.getElementById('tablakint').innerHTML="<tbody><tr>Üres<tr></tbody>"
}

