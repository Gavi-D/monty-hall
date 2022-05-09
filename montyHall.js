var carDoor;      //door for the car
var selected;     //variable for selected door
var reveal;       //variable for the revealing door
var switched;     //boolean


function randInt(n) {
    var rand = Math.floor(Math.random()*n);
    return rand;
}

function startGame() {
    carDoor = randInt(3); //assing the car to a random door
    document.getElementById('message').innerHTML = "Please select a door.";
}

function remainingDoor(door1, door2) {
    return 3 - door1 - door2; //reveals the door that is not revealed or selected
}

function askSwitch() {
    switched = confirm("Do you want to switch doors? Remember that there is 66% chance that you will win the car if you switch!");
    if (switched == true) //if the user switches the doors
        selected = remainingDoor(selected, reveal);
}

function mod(n,k) { //thank you stackoverflow
    return ((n%k)+k)%k; //why two mods? to account for negative values. if the first mod gives negative values, the second mod will make sure that a positive value is returned
}

function playAgain() {
    setTimeout(function() {
      switched = confirm("Play again?");
         if (switched == true) {
             document.getElementById('door0').src = 'door.png';
             document.getElementById('door1').src = 'door.png';
             document.getElementById('door2').src = 'door.png';
             startGame();
         }
         else
            document.getElementById('message').innerHTML = "Thanks for playing!";
    },500);
}


function setDoor(n, img) {  //n is the door number and img is the image we wanna set the door to. Options: car or trash
    document.getElementById('door'+n.toString()).src = img+'.png' //courtesy of Avi Sternlieb
}

function whichOneToReveal() { //door to be revealed
    if (selected != carDoor)  //if the selected door is not the carDoor
        return remainingDoor(carDoor, selected);
    var otherDoors = [mod(carDoor-1,3), mod(carDoor+1,3)];
    return otherDoors[randInt(2)];
}

function checkIfWon() {

    if (selected==carDoor) {
        document.getElementById('message').innerHTML = "Congratulations, you won a brand new Tesla.";
            setDoor(selected, 'tesla');
        }
    else {
        document.getElementById('message').innerHTML = "Uh oh...you just got trashed ";
        setDoor(selected, 'trash');
    }
}

function selectADoor(chosenOne) {
        selected = chosenOne;
        reveal = whichOneToReveal();
        /*
        console.log('Car is behind: ' + (carDoor+1));
        console.log('We reveal    : ' + (reveal+1));    //courtesy of Avi Sternlieb
        console.log('-----------------------');
        */
        document.getElementById('message').innerHTML = "Let's see what's behind Door #" + (reveal+1) + "!";
        setDoor(reveal, 'trash');

        setTimeout(function() {   //thanks stackoverflow
             askSwitch();
             /*
             console.log('Initial pick: ' + (selected+1));
             console.log('You DID' + (switched? '':'N\'T') +' switch!');
             console.log('Final pick  : ' + (selected+1));                      //courtesy of Avi Sternlieb
             console.log('YOU ' + (selected==carDoor? 'WON' : 'LOST')+'!!!')
             console.log('%%%%%%%%%%%%%%%%%%%%%%%%%');
             */
             checkIfWon();
             playAgain();
        },500);
}
