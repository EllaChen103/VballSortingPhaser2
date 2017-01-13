/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};
var score = 0;

game_state.main = function() {};
game_state.main.prototype = {




    preload: function() {
        game.load.image('net', 'assets/net.png');
        // game.load.image('player', 'assets/player.png');
        game.load.spritesheet('object', 'assets/object.png', 65, 60);
        game.load.spritesheet('basket', 'assets/basket.png', 815, 176);
    },

    create: function() {
        //Arcade physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Background color blue
        game.add.sprite(15, 10, 'net');
        this.baskets = game.add.sprite(-1, 425, 'basket');
        game.physics.arcade.enable(this.baskets);
        this.baskets.enableBody = true;




        //create left and right arrow keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);


        //create objects group
        this.objects = game.add.group();
        //enable body 4 all objects in group
        this.objects.enableBody = true;
        //anchor this object to_this variable
        var _this = this;
        //create objects over time



        this.dropTimer = 1500;
        this.vballDrop = setInterval(function() {
            //create an object at top of screen at a random x
            var object;
            do {
                object = _this.objects.create(Math.random() * 800, -64, 'object');

            }
            while ((object.body.x > 240 && object.body.x < 260) || (object.body.x > 525 && object.body.x < 535)) {
                object = _this.objects.create(Math.random() * 800, -64, 'object');
            }

            console.log(object.body.x)

            object.frame = Math.floor(Math.random() * 3);
            //gravity
            object.body.gravity.y = 450;
        }, this.dropTimer); //1000 = 1000ms = 1 second


        this.scoreText = game.add.text(16, 25, 'Score: ', {
            fontsize: '32px',
            fill: '#ffffff'

        });


        /* Records player selection
        0 = red
        1 = blue 
        2 = green
        */
        this.currentFrame = 0;

    },

    update: function() {

        //move player left and right
        if (this.left.isDown) {
            // this.player.body.velocity.x = -375;
            //turns vball red
            this.objects.forEach(function(item) {
                item.frame = 0;
            });

        }

        else if (this.up.isDown) {
            //turns vball blue
            this.objects.forEach(function(item) {
                item.frame = 1;
            });
        }

        else if (this.right.isDown) {
            // this.player.body.velocity.x = 375;
            //turns vball green
            this.objects.forEach(function(item) {
                item.frame = 2;
            });
        }
        //stop player when no key pressed
        else {
            //this.player.body.velocity.x = 0;
        }


        game.physics.arcade.overlap(this.baskets, this.objects, this.hitBasket, null, this);


        this.scoreText.text = "Score: " + score;

    },
    hitBasket: function(basket, object) {
        // this.scoreText.text = object.body.x;
        //if basket is red
        if (object.body.x < 277) {
            if (object.frame === 0) {
                basket.frame = 1;
                score++;
                setInterval(function() {
                    basket.frame = 0;
                }, 500); //250 = 250ms = 0.25 second
            }
            else {
                score--;
            }
        }
        else if (object.body.x < 554) { //blue basket
            // this.scoreText.text = object.body.x;   
            if (object.frame === 1) {
                basket.frame = 2;
                score++;

                var _this = this;
                setInterval(function() {
                    basket.frame = 0;
                }, 500); //250 = 250ms = 0.25 second

            }
            else {
                score--;
            }

        }

        else { //green basket
            // this.scoreText.text = object.body.x;
            if (object.frame === 2) {
                basket.frame = 3;
                score++;
                var _this = this;
                setInterval(function() {
                    basket.frame = 0;
                }, 500); //250 = 250ms = 0.25 second

            }
            else {
                score--;
            }
        }
        object.kill();
        if (score % 5 === 0) {
            clearInterval(this.vballDrop)
            if (this.dropTimer > 850) this.dropTimer -= 300;
            var _this = this;
            this.vballDrop = setInterval(function() {
                //create an object at top of screen at a random x
                var object = _this.objects.create(Math.random() * 800, -64, 'object');
                object.frame = Math.floor(Math.random() * 3);
                //gravity
                object.body.gravity.y = 450;
            }, this.dropTimer); //1000 = 1000ms = 1 second
        }
    }
};

game.state.add('main', game_state.main);
//game.state.start('main');
