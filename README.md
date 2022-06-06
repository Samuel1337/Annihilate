# Annihilate

Production

Live Version: https://samuel1337.github.io/W9D4

Instructions:

Click to select a planet, click again to choose which other planet you wish
to attack. You can only select planets with a blue aura because you belong in
the blue team.

The game is divided into two teams, the blue one is controlled by the player
while the red one is AI controlled. The objective of the game is to conquer
as many planets as you can and completely annihilate your enemy before they
do the same to you.

Technologies: Canvas API

Code Snippet:

Below is the core of the AI thinking process.
The AI runs decideAttack() every 3 seconds.

At this.updatePlanets() the AI updates his vision of the game,
separating the planets into 3 different arrays, one for the player,
one for itself and one for the remaining unconquered ones.

At this.watchForPotentialPreys() the AI creates an array of weaker
planets it can target for a successful attack. This function will be
later used in this.attackEmpty(), this.attackPlayer(), and
this.attackVulnerable().

At this.watchForPotentialPredators() the AI creates an array of stronger
planets that threaten its superiority in the game. This function will be
later used in this.doubleAttackPlayer().

Before it gets into the switch the AI tries a this.attackVulnerable().
That makes it seem that the AI is thinking like a human, and oftentimes
it even sabotages the plans of the player. If it can't find a vulnerable
planet to attack, then the conditional will result in false and the switch
will be activated.

decideAttack() {
    const die = this.rollDie();
    this.updatePlanets();
    this.watchForPotentialPreys();
    this.watchForPotentialPredators();
    
    if (!this.attackVulnerable()) {

        switch (die) {
            case 1:
                this.attackEmpty();
            break;
                
            case 2:
                this.attackPlayer();
            break;
        
            case 3:
                this.attackVulnerable();
            break;

            case 4:
                this.reinforceAlly();
            break;

            case 5:
                this.doubleAttackPlayer();
            break;

            default:
                this.wait();
            break;
        }
    } 
}

The randomness of the AI happens in 3 ways:

- It selects a random target, from an array of potential targets;
- It selects a random planet to attack from, from an array of potential attackers;
- It selects a random action, from five different options.

Future Features:

- Multiple Levels.


Development

Background:

My goal is to create a space themed game with two (or multiple) competing teams.
Each team begins with one planet under their domain and their goal is to send
fighter spaceships into other planets to expand their territory. The game ends when
one team annihilates the other (or all the others).

The plan is to have 3 basic node trees, for the player, for the AI, and for the game.
The neutral planets belong to the game and they get removed and added to the player/AI
trees as they get conquered. Hidden nodes in the game tree carry groups of fighter jets
and handle their departure and arrival from planets, as well as casualties according to
the collision of the elements that represent them in the canvas.

Stages are randomly generated and difficulty increases at every level.

Functionality:

In 'Annihilate', users will be able to:

- Control fleets of spaceships;
- Conquer planets;
- Conquer planetary systems (levels);
- Play against one or multiple AIs;
- Save the Earth from annihilation;
- Annihilate enemy alien species.

In addition, this project will include:

- A main menu;
- A UI that keeps track of the player's progress.

Wireframe: https://wireframe.cc/lpR9Iu

Technologies: Canvas API

Implementation Timeline:

- Friday Afternoon & Weekend: canvas and elements display;
- Monday: Core gameplay;
- Tuesday: Core gameplay;
- Wednesday: Organization of levels and main menu;
- Thursday morning: Testing and final adjustments;
