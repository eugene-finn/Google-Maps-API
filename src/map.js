require('./style.css');
const template = require('./popup.hbs');

let map;
let newMarkersOnMapObj = {
  placeName: '',
  LatLng: [],
  reviews: []
};
let markersOnMap = [{
    placeName: 'Dot 1',
    LatLng: [{
        lat: 47.13200632298488,
        lng: 17.745350394531254
    }],
    reviews: [
        {
            name: 'имя 1',
            text: 'отзыв 1'
        },
        {
            name: 'имя 1',
            text: 'отзыв 1'
        }
    ]
},
{
    placeName: 'Dot 5',
    LatLng: [{
        lat: 47.06937367885084,
        lng: 18.050221000000004
    }],
    reviews: [
        {
            name: 'имя 1',
            text: 'отзыв 1'
        }
    ]
}];

// так лучше загружается
window.onload = () => {
    initMap();
    addMarkersOnMap();
};

 function initMap() {

  let centerCoords = { lat: 46.978566, lng: 18.050221 };

  let opt = {
    center: centerCoords,
    zoom: 10
  }

  map = new google.maps.Map(document.querySelector('.map'), opt);

  map.addListener('click', e => {
    // console.log(e.latLng.lat(), e.latLng.lng(), e.latLng.toJSON());
    let coords = e.latLng.toJSON();

    createPlacemark(coords);
  });

  let info;

  async function createPlacemark(coords) {

    if (info) {
      await info.setPosition(coords);
      console.log('if info', coords);
      // иначе создаем с новыми координатами
    } else {
      info = await new google.maps.InfoWindow({
        position: coords,
        map: map,
        content: template({ address: newMarkersOnMapObj.placeName }),
        maxWidth: 379
      })
      console.log('else info', info);
    
    }

    let geocoder = await new google.maps.Geocoder();

    geocoder.geocode({ latLng: coords }, function (results, status) {
      if (status == 'OK' && results.length > 0) {
        let address = results[0].formatted_address;
        // записываем название места newMarkersOnMapObj = { ...newMarkersOnMapObj, placeName: address, LatLng: coords }
        newMarkersOnMapObj.placeName = address;
        newMarkersOnMapObj.LatLng.push(coords);
        info.setContent(template({ address: newMarkersOnMapObj.placeName }));
        

      } else {
        // записываем название места и координаты
        newMarkersOnMapObj.placeName = 'New Place';
        newMarkersOnMapObj.LatLng.push(coords);
      }

    });
    // console.log('info', querySelector('add-review'));    
  }

}


document.body.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('add-review')) {
    let namePopup = document.querySelector('#review-name').value;
    let textPopup = document.querySelector('#review-text').value;
  
    let reviewObj = {
      ...reviewObj,
      name: namePopup,
      text: textPopup
    }

    newMarkersOnMapObj.reviews.push(reviewObj)
    console.log(newMarkersOnMapObj);
    
    // new google.maps.Marker({
    //   position: markersOnMap[i].LatLng[0],
    //   map: map,
    //   title: markersOnMap[i].address
    // });

    // infoWindow.close();
    markersOnMap.push(newMarkersOnMapObj);

    console.log(markersOnMap);
  }
  
  // // пушим в массив reviews
  
  // console.log('3 newMarkersOnMapObj reviews', newMarkersOnMapObj);
  addMarkersOnMap();
  
})


function addMarkersOnMap() {

  for (var i = 0; i < markersOnMap.length; i++) {

    // let contentString = '<div id="content"><h1>' + markersOnMap[i].placeName + '</h1><p>Обзор точки</p></div>';
    let contentString = template({
      address: markersOnMap[i].placeName,
      reviews: markersOnMap[i].reviews
    });

    const marker = new google.maps.Marker({
      position: markersOnMap[i].LatLng[0],
      map: map,
      title: markersOnMap[i].address
    });

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 379
    });

    marker.addListener('click', function () {
      infowindow.open(marker.get('map'), marker);
      // InforObj[0] = infowindow;
    });

  }
}
    