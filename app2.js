new Vue({
    el: '#app',
    data: {
        gameIsRunning: false,
        caves:         false,
        store:         false,
        home:          false,
        caveOfThranduil: false,
        caveOfKlon: false,
        swordOfMayhem: false,

        
    },
    methods: {
        startgame: function (){
            this.gameIsRunning = true;

        },
    caves: function (){
        this.caves = true;
        
    }
    }
});
