function getNumberOfPlayers() {
    div = document.getElementById("nameTable");
    div.innerHTML = '';
    var tellPlayer = document.createElement("div");
    tellPlayer.id="tellPlayer";
    div.appendChild(tellPlayer);
    var label = document.createElement("label");
    label.textContent="Number of Players: (max 5)";
    div.appendChild(label);
    var input = document.createElement("input");
    input.type="text";
    input.id="numOfMembers";
    input.value="";
    div.appendChild(input);
    var button = document.createElement("button");
    button.id="fillDetails";
    //button.onclick="addFields()";
    button.textContent="Enter Player Names";
    button.addEventListener("click", function () {addFields()},false);
    div.appendChild(button);

    var newDiv = document.createElement("div");
    newDiv.id = "nameContainer";
    div.appendChild(newDiv);
}
