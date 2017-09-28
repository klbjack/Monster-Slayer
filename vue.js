new Vue ({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameStarted: false,
    turns: []
  },

  methods: {
    start: function() {
      // testing
      this.gameStarted = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns.length = 0;
    },

    attack: function() {
      this.registerAttack( this.randomNumber(), this.randomNumber());
    },

    specialAttack: function() {
      this.registerAttack( this.randomNumber()*2, this.randomNumber());
    },

    heal: function() {
      var damage = this.randomNumber() - 10;
      var localPlayerHealth = this.playerHealth - damage;

      this.turns.unshift({ isPlayer: true, text: 'Player heals for ' + damage + ' points' });

      if ( localPlayerHealth > 100 )
        localPlayerHealth = 100;
      this.playerHealth = localPlayerHealth;
    },

    registerAttack: function( playerDamage, monsterDamage ) {
      var localMonsterHealth = this.monsterHealth - monsterDamage;
      var localPlayerHealth = this.playerHealth - playerDamage;

      this.turns.unshift({ isPlayer: false, text: 'Monster gets hit for ' + monsterDamage + ' points' });
      this.turns.unshift({ isPlayer: true, text: 'Player gets hit for ' + playerDamage + ' points' });

      if ( localMonsterHealth <= 0 ){
        localMonsterHealth = 0;
        this.monsterHealth = localMonsterHealth;
        alert( 'You are victorious!');
        this.gameStarted = false;
        return;
      }
      if ( localPlayerHealth > 100 )
        localPlayerHealth = 100;
      if ( localPlayerHealth <= 0 ){
        localPlayerHealth = 0;
        this.playerHealth = localPlayerHealth;
        alert( 'You have been vanquished!' );
        this.gameStarted = false;
        return;
      }
      this.monsterHealth = localMonsterHealth;
      this.playerHealth = localPlayerHealth;
    },

    randomNumber: function() {
      return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }
  }
});
