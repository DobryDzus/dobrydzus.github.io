function kosikalert(nazevProduktu) {
    alert(nazevProduktu + ' přidán do košíku!');
}

function pridatDoKosiku(divElement) {
    var nazevProduktu = divElement.getAttribute('data-nazev');

    if (nazevProduktu) {
        kosikalert(nazevProduktu);
    } 
    
    else {
        alert('Produkt je dočasně nedostupný.');
    }
}

function nedostupne(divElement) {
    alert('Produkt je dočasně nedostupný.');
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
    const map = new google.maps.Map(document.getElementById("map"),
     {
      center: { lat: 50.108, lng: 14.584 },
      zoom: 14,
      mapId: "3f84587718826a6",
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "poi.business",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    });

    const contentstring = 
    `<div class="info-window" style="max-width=200px">` +
      `<img src="img/ccm.jpg">` +
      `<h2>Adresa</h2>` +
      `<p>Chlumecká 765/6, 198 19 Praha 9</p>` +
      `<a href="https://maps.app.goo.gl/YC3GVb49LeAVu9vH8">Navigovat</a>` +
    `</div>`;
    

    const infowindow = new google.maps.InfoWindow({
      content: contentstring,
    });

    const marker = new AdvancedMarkerElement({
      position: { lat: 50.108, lng: 14.584 },
      map,
      title: "Hello World!",

    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  }
  
  
  window.initMap = initMap;