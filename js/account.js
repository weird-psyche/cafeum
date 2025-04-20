



  console.log(location.search);
  let vasarloId=location.search;
  document.getElementById("vasarloid").innerHTML=vasarloId;


function switcher(link) {
  location.assign(link+vasarloId);
}
