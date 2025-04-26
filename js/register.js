function AccountCreate() {

  let Pwd1 = document.getElementById('Password').value;
  let Pwd2 = document.getElementById('Password2').value;
  let Lakcim = document.getElementById('Location').value;

  if(Pwd1 != Pwd2){
    //document.getElementById('BadPwd').innerHTML="<p style='text-align:center; color:red;'>ELTÉRŐ JELSZÓ</p>";
    Swal.fire({
      width: '16rem',
      title: 'Eltérő jelszavak!',
      icon: 'warning',
      confirmButtonColor: '#1e2326',
    });
  }
  else{
  const logindiv = document.getElementById("LoginForm");
  const DivData = {
    //vasarloId: getId,
    vasarloNev: logindiv.VezNev.value+" "+logindiv.KerNev.value,
    vasarloMail: logindiv.Email.value,
    vasarloJelszo: logindiv.Password.value,
    //vasarloCim: logindiv.Location.value,
    vasarloCim: Lakcim.toString(),
  };
  console.log(JSON.stringify(DivData));
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function(){
  if(xmlhttp.readyState==4 && xmlhttp.status==200){
    console.log("Sikeres POST keres!");
  } else if(xmlhttp.readyState==4){
    console.log("Hiba a POST keres soran: "+xmlhttp.status);
  }
};
// lokalis szerver:
//xmlhttp.open("POST","https://localhost:7032/api/cafeum/vasarlok",true);
//xmlhttp.setRequestHeader("Content-Type", "application/json");

// online szerver:
xmlhttp.open("POST","https://api-20nv4395y20947yv5n2y4v02y3v20n43v5273vy-ngrok-dev.eu.ngrok.io/api/cafeum/vasarlok",true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("ngrok-skip-browser-warning", "1");

xmlhttp.send(JSON.stringify(DivData));

//alert("Sikeres regisztracio");
location.assign("login.html");
}
}
