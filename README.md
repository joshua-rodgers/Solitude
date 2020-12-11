# Solitude
retro-themed game of solitaire in js. color scheme inspired by the friendly orange glow of the PLATO system.

![screenshot of game running](/screenshot.png)

implementation is very rough, i sketched it out as i went not planning out anything. code is very verbose and repetitive, the data model
and command processor needs refactoring seriously, but overall it was fun to glue something together very linearly just going with whatever
decisions i had already made, not fixing anything, just dealing with the consequences.

the design decision i am proud of is that i mantained a separation of concerns between the modules that compose the inner workings of the game.
the data model is self contained and doesn't rely on any other modules beyond those specifically dedicated to initializing it.
when its methods are called there is an expectation that all validation
has been done, though any errors are gracefully handled. the control layer, game_master provides validation mechanisms and defines the basic 
logic of the game. command_processor validates only the syntax of the entered commands to prevent invalid values being passed any further into 
the machinery. it does not concern itself with any game logic, it merely processes commands and generates output to be passed to the controller
ans thus acts as a filter, leaving the controller to operate only on predicatable input. that i was able to maintain the integrity of this
structure allows me to forgive the overall sloppiness of the code, it displays a fundamental understanding of the relationships between the 
modules and therefore the ability to re-implement the entire thing properly with planning. i feel comfortable saying i learned something from 
doing this!

the commands are extremely verbose. to move a card in the tableau, a command would be "MOVE 7 HEARTS TO 8 SPADES", or to start a foundation
after encountering an ace, "BUILD CLUBS A". i'd like to make it more concise for example compressing the former command to "M 7H 8S" or even
"7H8S".

the command parser is something i actually intend to rework later, to structure it into a sort of tree in js object notation similar to what 
i began in the new network simulator i started and never finished a while back. since i was just pushing through i ended just creating a pile 
of if statements that makes me cringe.

i recorded the entire process of coding this and posted the videos on my youtube channel to catalog these little projects. recording videos 
somehow helped me remain consistent in working on the project everyday.

[link to youtube](https://www.youtube.com/channel/UCv3VcivgQIACRhafV86Usng)

## to play
face cards are entered only by first letter: "K, Q, J, A".

to move a card within the tableau:  
**MOVE VALUE SUIT TO VALUE SUIT**  
example:  
MOVE 10 CLUBS TO J DIAMONDS 

to move a card to a foundation:  
**BUILD SUIT VALUE**    
example:  
BUILD SPADES 5  

to turn over a card in the stock pile:  
**STOCK**  
  
to move a card from the stock pile to the tableau:  
**STOCK TO VALUE SUIT**  
example:  
STOCK TO 7 HEARTS  

to move a card from the waste pile to the tableau:  
**WASTE TO VALUE SUIT**  

to move a card from stock pile to foundation:  
**STOCK TO SUIT**  

to move a card from waste pile to foundation:  
**WASTE TO SUIT**  

to move a king to an empty column:  
**MOVE K SUIT TO COLUMN NUMBER**  

to move a king in stock pile to empty column:  
**STOCK TO COLUMN NUMBER**  

to move a column of consecutive cards to another column:  
**MOVE COLUMN NUMBER TO COLUMN NUMBER**  

if command is entered imporperly "INVALID COMMAND" will be output below the input box.  
input is not case sensitive, it is capitalized programitically.  


