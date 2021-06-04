<template>
    <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view" >
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
    </baidu-map>
</template>

<script>
    export default {
        name: "map",
        data () {
            return {
                center: {lng: 0, lat: 0},
                zoom: 3
            }
        },
        methods: {
            handler ({BMap, map}) {
                console.log(BMap, map)
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 15
            }
        }
    }
</script>

<style scoped>
    .bm-view {
        width: 100%;
        height:600px;
    }
</style>
