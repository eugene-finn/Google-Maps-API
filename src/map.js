require('./style.css');
const template = require('./popup.hbs');

function initMap() { 
    let pos = { lat: 46.978566, lng: 18.050221 };
    
    let opt = {
        center: pos,
        zoom: 10
    }

    let map = new google.maps.Map(document.querySelector('.map'), opt);

    map.addListener('click', e => {
        // console.log(e.latLng.lat(), e.latLng.lng(), e.latLng.toJSON());
        addNewPopup(e.latLng.toJSON());
 
    });

    function addNewPopup(coords) {
        console.log(coords);
        let info = new google.maps.InfoWindow({
            position: coords,
            map: map,
            content: template()
        });

        console.log(info);
    }
    
    // let marker = new google.maps.Marker({
    //     position: pos,
    //     map: map,
    //     title: 'Hello World!'
    // });

    marker.addListener('click', function () {
        info.open(map, marker);
    });
    marker.setMap(map);
}

initMap();