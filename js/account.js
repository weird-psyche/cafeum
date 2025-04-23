



  //console.log(location.search);
  let vasarloId=location.search;
  // -- ki kell szedni az osszeset -- document.getElementById("vasarloid").innerHTML=vasarloId;


function switcher(link) {
  location.assign(link+vasarloId);
}
function switcher2(link) {
  location.assign(link+vasarloId+"#finomsagok");
}
