function initMap() { 
    let pos = { lat: 46.978566, lng: 18.050221 };
    
    let opt = {
        center: pos,
        zoom: 10
    }

    let map = new google.maps.Map(document.querySelector('.map'), opt);

    let marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Hello World!'
    });

    let info = new google.maps.InfoWindow({
        content: '<h3>это метсто H3</h3><p>Простое описание места</p>'
    });

    marker.addListener('click', function () {
        info.open(map, marker);
    });
    marker.setMap(map);
}

initMap();

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

