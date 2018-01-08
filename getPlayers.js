function addFields() {
    var p = document.getElementById("tellPlayer");
    p.innerHTML = '';
    // Number of inputs to create
    var number = document.getElementById("numOfMembers").value;

    // Container <div> where dynamic content will be placed
    var container = document.getElementById("nameContainer");
    // Clear previous contents of the nameContainer
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    var form = document.createElement("form");
    form.name = "nameForm";
    for (i = 0; i < number; i++) {
        // Append a node with a random text
        form.appendChild(document.createTextNode("Player " + (i + 1)));
        // Create an <input> element, set its type and name attributes
        var input = document.createElement("input");
        input.type = "text";
        input.name = "member" + i;
        input.id = "member" + i;
        input.required = true;
        form.appendChild(input);
        // Append a line break 
        form.appendChild(document.createElement("br"));
    }
    var subButton = document.createElement("button");
    subButton.type = "button";
    subButton.textContent = "Start Game!";
    subButton.id = "submitButton";
    form.appendChild(subButton);
    container.appendChild(form);
    var subButton = document.getElementById("submitButton");
    subButton.addEventListener('click', function () { setUpGame() }, false);
    if(number > 5) {
        document.getElementById("tellPlayer").innerHTML="<p>Max of 5 players</p>"
        document.getElementById("nameContainer").innerHTML='';
    }
}

function setUpGame() {
    var members = [];
    for (i = 0; i < 5; i++) {
        var member = document.getElementById("member" + i);
        if (member != null) {
            members.push(member.value);
        }
    }
    document.getElementById("gamePrereqs").style="display:none";
    showPlayers(members);
}

function showPlayers(members) {

    ReactDOM.render(
        React.createElement(PlayerTable, {players:members, numOfPlayers:members.length}),
        document.getElementById("game")
    );

}

function updatePlayers(state) {
    var theRollValue = document.getElementById("roll").value;
    document.getElementById("tableBody").innerHTML = "";
    for (var i = 0; i < state.players.length; i++) {
        var table = document.getElementById("tableBody");
        var tr = document.createElement("tr");
        tr.id = "player"+i;
        table.appendChild(tr);
        ReactDOM.render(
            React.createElement(PlayerFrames, {state}|{}),
            document.getElementById("player"+i)
        );
    }
}