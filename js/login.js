function AccountCheck() {
  let Mail = document.getElementById('Email').value;
  let Pwd = document.getElementById('Password').value;
  let talalt=false;
  let MailIndex=0;


  if(Mail == "admin-panel" && Pwd == "admincafeum"){
    alert("Sikeres bejelentkezes ADMIN");
    location.assign("admin.html");
  }

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if(this.readyState==4 && this.status==200){
      const object = JSON.parse(this.responseText);
      //console.log(object);
      for(let i=0;i<object.length;i++){
        if(Mail==object[i].vasarloMail){
          talalt=true;
          MailIndex=i;
          break;
        }
        else talalt=false;
      }
      if(talalt){
        if(Mail == object[MailIndex].vasarloMail && Pwd == object[MailIndex].vasarloJelszo){
          //alert("Sikeres bejelentkezes");
          //location.assign("index_guest.html?"+object[MailIndex].vasarloId);
          localStorage.setItem("vasarloId", object[MailIndex].vasarloId);
          localStorage.setItem("vasarloNev", object[MailIndex].vasarloNev);
          location.assign("index_guest.html");
        } else {
          //document.getElementById('BadCode').innerHTML="Hibas email vagy jelszo!";
          //alert("Hibas email vagy jelszo!");
          Swal.fire({
            width: '16rem',
            title: 'Hibás email vagy jelszó!',
            icon: 'error',
            confirmButtonColor: '#1e2326',
          });
        }
      } else {
        //document.getElementById('BadCode').innerHTML="Fiok nem letezik!";
        //alert("Fiok nem letezik!");
        Swal.fire({
          width: '16rem',
          title: 'Fiók nem létezik!',
          icon: 'error',
          confirmButtonColor: '#1e2326',
        });
      }
    }
  }
// lokalis szerver:
//xmlhttp.open("GET","https://localhost:7032/api/cafeum/vasarlok",true);

// online szerver:
xmlhttp.open("GET","https://api-20nv4395y20947yv5n2y4v02y3v20n43v5273vy-ngrok-dev.eu.ngrok.io/api/cafeum/vasarlok",true);
xmlhttp.setRequestHeader("ngrok-skip-browser-warning", "1");

xmlhttp.send();
}
