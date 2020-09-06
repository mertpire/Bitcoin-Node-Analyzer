
  // Creating Array to get API
  let array = []
  let x = document.getElementById('array').textContent;
  
  
  let strToarr = x.split(",");
  
  let removeToxic = strToarr.splice(1, strToarr.length - 2);
  for (let i = 0; i < removeToxic.length; i++) {
    removeToxic[i] = removeToxic[i].replace("'", "");
  
  }
  for (let i = 0; i < removeToxic.length; i++) {
    removeToxic[i] = removeToxic[i].replace("'", "");
  
  }
  
  array = removeToxic;
  
  
  
  
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  document.getElementById("upload_json").addEventListener('click', getAPI);
  
  // Getting API and Data
  getAPI();
  getData();
  
  // Showing data on the map
  var mymap = L.map('issMap').setView([0, 0], 1);
  var attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  var tile_url = 'https:///{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var tiles = L.tileLayer(tile_url, { attribution });
  tiles.addTo(mymap);
  
  console.log(array.length)
  
  async function getAPI() {
    //Get longitude and latitude from API
    for (let ips = 0; ips < array.length; ips++) {
  
      const api_url = "http://api.ipapi.com/" + array[ips] + "?access_key=c7d703b66b6449ac03d4f29f312d56f3";
  
      const response = await fetch(api_url);
      const data = await response.json();
      const { longitude, latitude, ip, country_name, region_name, city, location } = data;
      const geoname_id = location['geoname_id'];
  
      //Write to db
  
      firebase.database().ref('/Ipss/' + ips + '_' + geoname_id).set({
        id: geoname_id,
        ip: ip,
        longitude: longitude,
        latitude: latitude,
        country_name: country_name,
        region_name: region_name,
        city: city
  
      });
  
    }
  }
  async function getData() {
  
  
    firebase.database().ref('Ipss/').on('value', function (snapshot) {
      var views = snapshot.numChildren();
  
      snapshot.forEach(function (childSnap) {
  
        
        const latitude = childSnap.val().latitude;
        const longitude = childSnap.val().longitude;
        const ip = childSnap.val().ip;
        const region_name = childSnap.val().region_name;
        const city = childSnap.val().city;
        const country_name = childSnap.val().country_name;
  
  
        var marker = [];
        var marker1 = L.marker([latitude, longitude]).addTo(mymap).bindPopup('ip :' + ip + '<br>' + 'Region :' + region_name + '<br>' + 'City :' + city + '<br>' + 'Country :' + country_name + '<br>' + 'Latitude :' + latitude + '<br>' + 'Longitude :' + longitude + '<br>');
        marker.push(marker1);
  
      })
  
  
      document.getElementById('nodes').innerHTML = views + ' nodes';
  
  
  
  
    });
  
  }
  