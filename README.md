# W9D4

Initial Proposal:

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