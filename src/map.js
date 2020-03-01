require('./style.css');
const template = require('./popup.hbs');

let markers = [];
let info;

// markers.push(marker);

function initMap() { 

    // let marker = new google.maps.Marker({
    //     position: coords,
    //     map: map,
    //     title: 'Hello World!'
    // });

    let pos = { lat: 46.978566, lng: 18.050221 };
    
    let opt = {
        center: pos,
        zoom: 10
    }

    let map = new google.maps.Map(document.querySelector('.map'), opt);

    map.addListener('click', e => {
        // console.log(e.latLng.lat(), e.latLng.lng(), e.latLng.toJSON());
        let coords = e.latLng.toJSON();

        createPlacemark(coords);

    });

    function createPlacemark(coords) {
        
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ latLng: coords }, function (results, status) {
            if (status == 'OK' && results.length > 0) {
                var address = results[0].formatted_address;

                console.log('b', address);
            } else {
                console.log('Адрес не найден');
            }
        });
        
        if (info) {
            info.setPosition(coords); 
            // если не то создаем новый            
        } else {
            info = new google.maps.InfoWindow({
                position: coords,
                map: map,
                content: template(),
                properties: {
                    address: 'some adres'
                }
            } )
            
        }
        
        // let info = new google.maps.InfoWindow({
        //     position: coords,
        //     map: map,
        //     content: template(),
        //     properties: {
        //         address: 'some adres'
        //     }
        // });
        
        // infowindow.close();

    }

    // myMarker = {
    //     coords: { a: 11, b: 12 },
    //     address: 'avenue',
    //     name: 'Petr',
    //     reviews: [
    //         { name: 'name 1', text: 'text 1' },
    //         { name: 'name 2', text: 'text 2' },
    //         { name: 'name 3', text: 'text 3' }
    //     ]
    // }

    // marker.addListener('click', function () {
    //     info.open(map, marker);
    // });

    // google.maps.event.addListener(marker, 'click', function () {
    //     infowindow.open(map, marker); 
    // });
    
    // marker.setMap(map);
    let btn = document.querySelector('.add-review');

    console.log('btn', btn);
    btn.addListener('click', function (event) {
        event.preventDefault();
        console.log('Добавить');
    })
}

initMap();

