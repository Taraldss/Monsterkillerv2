new Vue({
    el: '#app',
    data: {
        gameIsRunning: false,
        location: '',
        playerItems: [],
        shop: [{
                name: 'shoulders',
                cost: 10,
                type: 'armor',
                armorValue: 10,
                owns: false,
            },
            {
                name: 'Bandana',
                cost: 10,
                type: 'armor',
                armorValue: 10,
                owns: false,
            },
        ],
        playerArmor: 0,
        playerHealth: 0,
        playerHealthMax: 120,
        playerManaMax: 50,
        playerMana: 50,
        playerCash: 10,
        monsterHealth: 100,
        monsterHealthMax: 1000,
        gameIsRunning: false,
        healCooldown: 0,
        specialAcd: 0,
        playerName: 'Leif Arne',
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;

        },
        travel: function (place) {
            this.location = place;
        },
        buy: function (index) {
            if (this.playerCash >= this.shop[index].cost) {
                this.playerItems.push(this.shop[index]);
                this.shop[index].owns = true;
                this.playerCash -= this.shop[index].cost;
                this.playerArmor += this.shop[index].armorValue;
            } else {
                alert('Cant afford this');
            }
        },
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = this.playerHealthMax;
            this.playerMana = 50;
            this.monsterHealth = this.monsterHealthMax;
            this.monsterHealthMax = 1000;
            this.turns = [];
        },
        /* map: function () {
             canv = document         <button id="reset" v-if="></button>.getElementById("gc");
             ctx = canv.getContext("2d");
             document.addEventListener("keydown", keyPush);
             setInterval(game, 1000 / 15);
         },
         keypush: function () {
             switch (evt.keyCode) {
                 case 37:
                     xv = -1;
                     yv = 0;
                     break;
                 case 38:
                     xv = 0;
                     yv = -1;
                     break;
                 case 39:
                     xv = 1;
                     yv = 0;
                     break;
                 case 40:
                     xv = 0;
                     yv = 1;
                     break;
             }
         },*/
        attack: function () {
            this.cooldown();
            var damage = this.calculateDamage(25, 50);
            this.monsterHealth -= damage;
            if (this.playerMana <= 40) {
                this.playerMana += 10;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Leif Arne hits the Monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        spell: function () {
            this.cooldown();
            var damage = this.calculateDamage(40, 150);
            this.monsterHealth -= damage;
            this.playerMana -= 25;
            this.turns.unshift({
                isPlayer: true,
                text: 'Leif arne uses flame punch' + damage
            });
            if (this.checkWin()) {
                return;
            }
            if (this.playerMana <= 25) {
                this.spell = false;

            } else {
                this.spell = true;
            }
            this.monsterAttacks();
        },
        specialAttack: function () {

            if (this.specialAcd === 0) {
                this.cooldown();
                var damage = this.calculateDamage(30, 100);
                this.monsterHealth -= damage;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Leif Arne crits Monster for ' + damage
                });
                if (this.checkWin()) {
                    return;
                }
                this.monsterAttacks();
                this.specialAcd = 3;
            }
        },
        heal: function () {
            if (this.healCooldown === 0) {
                this.cooldown();
                if (this.playerHealth <= 105) {
                    this.playerHealth += 15;
                } else {
                    this.playerHealth = playerHealthMax;
                }
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Leif arne heals for 10'
                });
                this.healCooldown = 3;
                this.monsterAttacks();

            }
        },

        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(6, 10);
            this.checkWin();
            this.playerDamage(damage);
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        },
        playerDamage: function (damage) {
            var remainingDamage = damage;
            if (remainingDamage >= this.playerArmor) {
                remainingDamage -= this.playerArmor;
                this.playerArmor = 0;
            } else {
                this.playerArmor -= remainingDamage;
                remainingDamage = 0;
            }
            this.playerHealth -= remainingDamage;
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        cooldown: function () {
            if (this.healCooldown != 0) {
                this.healCooldown--;
            }
            if (this.specialAcd != 0) {
                this.specialAcd--;
            }
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});