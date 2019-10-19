<template>
    <div id="map"></div>
</template>

<script>
    import mapboxgl from 'mapbox-gl'
    export default {
        name: "mapbox-full",
        data() {
            return {
                token: 'pk.eyJ1IjoiZ2FicmllbHJtcyIsImEiOiJjazFzbDBubjAwaDZoM2JwNGRxcmxjY25yIn0.dhif7znIWxyQLfbAGkfFIw',
                map: {},
                geocoder: {},
                localizacao: {
                    longitude: 0,
                    latitude: 0
                }
            }
        },

        methods: {
            startMap() {
                mapboxgl.accessToken = this.token;

                this.map = new mapboxgl.Map({
                    container: document.querySelector('#map'),
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [-47.8823, -15.7934], // Brasília-DF
                    zoom: 12
                });

                this.configureGeolocation();
                this.configureControlsMap();
            },

            configureGeolocation(){
                this.geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl,
                    placeholder: 'Pesquise Ex: Brasil ...'
                });
            },

            configureControlsMap(){
                this.map.addControl(this.geocoder, 'top-left');
                this.map.addControl(new mapboxgl.NavigationControl());
                this.map.addControl(new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                }))
            },

            markerLocationWithSearch(){
                this.map.on('load', () => {
                    this.geocoder.on('result', (ev) => {
                        let marker = {
                            longitude: ev.result.center[0],
                            latitude: ev.result.center[1]
                        };

                        this.clearMakers();
                        this.addMakerMap(marker);
                        this.setLocation(marker);

                    });
                });
            },

            markerLocationWithClick(){
                this.map.on('click', (e) => {
                    let marker = {
                        longitude: (e.lngLat.lng).toFixed(3),
                        latitude: (e.lngLat.lat).toFixed(3)
                    };

                    this.clearMakers();
                    this.addMakerMap(marker);
                    this.setLocation(marker);
                });
            },

            clearMakers() {
                let currentMaker = document.querySelectorAll('.mapboxgl-marker');

                if (currentMaker.length > 0) {
                    currentMaker.forEach((marker, index) => {
                        currentMaker[index].remove()
                    });
                }
            },

            addMakerMap({longitude, latitude}){
                let newMarker = new mapboxgl.Marker()
                        .setLngLat([longitude, latitude])
                        .addTo(this.map);
            },

            setLocation(location){
                Object.assign(this.localizacao, location);
                this.$emit('localizacao', this.localizacao);
            }
        },

        mounted() {
            this.startMap();
            this.markerLocationWithSearch();
            this.markerLocationWithClick();
        }
    }
</script>

<style scoped>
    #map {
        top: 0;
        bottom: 0;
        width: 100%;
        height: 500px;
    }
</style>