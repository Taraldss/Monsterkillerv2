new Vue({
    el: '#app',
    data: {
        gameIsRunning: false,
        location: 'home',
        item: 'swag',
        


        
    },
    methods: {
        startGame: function (){
            this.gameIsRunning = true;

        },
    travel: function (place){
        this.location = place;
    },
    gear: function (item){
        this.item = true;
    },
    }
});
