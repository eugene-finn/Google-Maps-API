require('./style.css');
const template = require('./popup.hbs');

let map,
    markersOnMap = [{
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
        placeName: 'Dot 2',
        LatLng: [{
            lat: 46.982313700173556,
            lng: 17.701405082031254
        }]
    },
    {
        placeName: 'Dot 3',
        LatLng: [{
            lat: 46.90543333705365,
            lng: 18.088673148437504
        }]
    },
    {
        placeName: 'Dot 4',
        LatLng: [{
            lat: 47.101166616735554,
            lng: 17.912891898437504
         
        }]
    },
    {
        placeName: 'Dot 5',
        LatLng: [{
            lat: 47.06937367885084,
            lng: 18.050221000000004
        }]
    }
    ];

// так вроде лучше загружается
window.onload = function () {
    initMap();
    addMarkersOnMap();
};
// markers.push(marker);

// Ждем полной загрузки страницы, после этого запускаем initMap()
// map.addDomListener(window, 'load', initMap);

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

    // let btn = document.querySelector('BODY');
    
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-review')) {
            event.preventDefault();
            console.log('Добавить');
        } 

    })

    let info;

    function createPlacemark(coords) {

        if (info) {
            info.setPosition(coords); 
            console.log('if info');
            // если не то создаем новый            
        } else {
            info = new google.maps.InfoWindow({
                position: coords,
                map: map,
                content: template({ address: 'ok' }),
                
            })
            console.log('else info');
            
        }

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ latLng: coords }, function (results, status) {
            if (status == 'OK' && results.length > 0) {
                var address = results[0].formatted_address;

                console.log('geocoder', address);
            } else {
                console.log('Адрес не найден');
            }
        });

    }
    
}

function addMarkersOnMap() {

    for (var i = 0; i < markersOnMap.length; i++) {
        
        // let contentString = '<div id="content"><h1>' + markersOnMap[i].placeName + '</h1><p>Обзор точки</p></div>';
        let contentString = template({
            address: 'Эадрес',
            reviews: markersOnMap[i].reviews
        });

        console.log('reviews', markersOnMap[i].reviews);
        console.log('markersOnMap', markersOnMap[i]);

        const marker = new google.maps.Marker({
            position: markersOnMap[i].LatLng[0],
            map: map
        });

        const infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200

        });

        marker.addListener('click', function () {
            infowindow.open(marker.get('map'), marker);
            // InforObj[0] = infowindow;
        });

    }
}

