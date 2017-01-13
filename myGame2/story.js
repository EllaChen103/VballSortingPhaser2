/* global game Phaser game_state */

game_state.story = function() {};
game_state.story.prototype = {


    preload: function() {
        game.load.image('net', 'assets/net.png');
        game.load.spritesheet('basket', 'assets/basket.png', 815, 176);
    },

    create: function() {
        game.add.sprite(0, 0, 'net');
        this.baskets = game.add.sprite(-1, 425, 'basket');

        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // this.storyText = game.add.text(16, 30, "bla bla bla story things. Switch the color of the ball /n to match the basket it is falling into!");
        // this.storyText.fontsize = '40px';
        // this.storyText.fill = '#ffffff';
        this.text = game.add.text(16, 30, 'Hinata is a high school volleyball player. Since he is a first year, \nhe is given the task of cleaning up the gym. Unfortunatley, he has to \nstudy for a test tonight. Help Hinata by cleaning up the gym! Use the \narrow keys to switch the color of the ball to match the basket it is \nfalling into! Press space to continue.');
        this.text.font = 'Coalition';
        this.text.fontWeight = 'bold';
        this.text.fontSize = 25;
        this.text.fill = '#ffffff';


    },

    update: function() {
        if (this.space.isDown) {
            game.state.start('main');
        }
    }

};

game.state.add('story', game_state.story);
game.state.start('story');
