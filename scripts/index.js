function getPlayersFromPlayerInput() {
    const playerStrings = document.getElementById("playerInput").value
    return sanitizeArray(playerStrings.split(/,\s*/))
}

function calculateGiftPairs(playerList) {
    // Create undirected graph of players 
    shuffledPlayers = randomizeArray(playerList)
    giftPairings = []

    for(let i = 0; i < shuffledPlayers.length - 1; i++) {
        giftPairings.push([shuffledPlayers[i], shuffledPlayers[i + 1]])
    }
    giftPairings.push([shuffledPlayers[shuffledPlayers.length - 1], shuffledPlayers[0]])

    return giftPairings
}

function sanitizeArray(array) {
    if(!array) {
        return []
    }
    const sanitizedArray = array
        .filter(obj => obj.length > 0)
        .map(obj => obj.toLowerCase().trim())

    if(sanitizedArray[0] == '') {
        return []
    } else {
        return sanitizedArray
    }
}

// Fisher-Yates shuff;e
function randomizeArray(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m]
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}


function showInputSection() {
    document.getElementById("inputCardContent").style.display = "block"
    document.getElementById("resultsSection").style.marginTop = 0
    document.getElementById("showInput").style.display = "none"
    document.getElementById("hideInput").style.display = "inline"

}

function hideInputSection() {
    document.getElementById("inputCardContent").style.display = "none"
    document.getElementById("resultsSection").style.marginTop = "-80px"
    document.getElementById("hideInput").style.display = "none"
    document.getElementById("showInput").style.display = "inline"
}

function clearPlayerInput() {
    document.getElementById("playerInput").value = ""
}

function clearResultsSection() {
    document.getElementById("resultsContainer").innerHTML = ""
}

function handleInputSectionSubmit() {
    const playerList = getPlayersFromPlayerInput()
    console.log(playerList)
    if(!playerList || playerList.length == 0) {
        alert("Please enter at least one person")
    } else {
        const giftPairings = calculateGiftPairs(playerList)

        clearResultsSection() 
        giftPairings.forEach(([giver, reciever]) => {
            document.getElementById("resultsContainer").innerHTML += createAssignmentComponent(giver, reciever)
        })
    }
    
}

function createAssignmentComponent(giver, reciever) {
    return `<div class="box assignment">
    ${giver}
    <span class="icon-text">
        <span class="icon assignedArrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </span>
    </span>
    ${reciever}
</div>`
}

var mysteryManShown = false
function toggleMysteryMan() {
    if(mysteryManShown) {
        document.getElementById("mysteryManContainer").innerHTML = ''
        mysteryManShown = false;
    } else {
        mysteryManShown = true;
        document.getElementById("mysteryManContainer").innerHTML += `
        <img id="image" src="./media/mysteryManXmas.jpg" />
        <h1>Happy Holidays!</h1>
        `
    }

}