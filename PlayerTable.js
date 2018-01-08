class PlayerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfPlayers: props.numOfPlayers,
            players: props.players,
            playerScores: this.initializeRollScores(props.numOfPlayers),
            currentRoller: 0,
            currentFrame: 0,
            currentRoll: 0,
            totalScores: this.initializeTotalScores(props.numOfPlayers),
            frameScores: this.initializeFrameScores(props.numOfPlayers),
            strikeFlag: this.initializeStrikeFlag(props.numOfPlayers),
            pinsRemaining:10
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.initializeRollScores = this.initializeRollScores.bind(this);
        this.roll = this.roll.bind(this);
    }

    initializeStrikeFlag(numOfPlayers) {
        var array = [];
        for (var i = 0; i < numOfPlayers; i++) {
            array.push(false);
        }
        return array;
    }

    initializeFrameScores(numOfPlayers) {
        var array = [];
        for (var i = 0; i < numOfPlayers; i++) {
            array.push([[], [], [], [], [], [], [], [], [], []]);
        }
        return array;
    }

    initializeRollScores(numOfPlayers) {
        var array = [];
        for (var i = 0; i < numOfPlayers; i++) {
            array.push([[" ", " "], [" ", " "], [" ", " "],
            [" ", " "], [" ", " "], [" ", " "], [" ", " "], [" ", " "],
            [" ", " "], [" ", " ", " "]])
        }
        return array;
    }

    initializeTotalScores(numOfPlayers) {
        var array = [];
        for (var i = 0; i < numOfPlayers; i++) {
            array.push([0]);
        }
        return array;
    }

    handleInputChange(event) {
        document.getElementById("gameNotes").innerHTML = '';
        const target = event.target;
        this.roll(target.value);
        event.target.value = '';
    }

    roll(roll) {
        var newState = this.state;
        if (newState.currentFrame == 9 && newState.currentRoll == 2) { 
            newState.pinsRemaining = 10;
            this.handleTenthFrame(newState, roll); 
        }
        if (newState.currentRoll == 1 && parseInt(roll) == newState.pinsRemaining) {
            this.roll("/");
            return;
        }
        if (parseInt(roll) >= 0 && parseInt(roll) <= newState.pinsRemaining) {
            newState.playerScores[newState.currentRoller][newState.currentFrame][newState.currentRoll] = parseInt(roll);
            newState.frameScores[newState.currentRoller] =
                this.calculateFrameScores(newState);
            if (!newState.strikeFlag[newState.currentRoller]) {
                newState.totalScores[newState.currentRoller][0] = newState.frameScores[newState.currentRoller][newState.currentFrame];
            }
            newState.pinsRemaining -= parseInt(roll);
            this.setState(this.setNewState(newState));
        } else if (roll == "x") {
            if (newState.currentRoll == 1) {
                document.getElementById("gameNotes").innerHTML = "Not a valid roll";
            } else {
                if (newState.currentFrame > 1 && newState.strikeFlag[newState.currentRoller]) {
                    var currentScore = newState.totalScores[newState.currentRoller][0];
                    newState.frameScores[newState.currentRoller][newState.currentFrame - 2] = currentScore + 30;
                    newState.totalScores[newState.currentRoller][0] = currentScore + 30;
                    newState.strikeFlag[newState.currentRoller] = false;
                }
                if (newState.currentFrame > 0 && newState.playerScores[newState.currentRoller][newState.currentFrame - 1][0] == "x") {
                    newState.strikeFlag[newState.currentRoller] = true;
                }
                if (newState.currentFrame > 0 && newState.playerScores[newState.currentRoller][newState.currentFrame - 1][1] == "/") {
                    var lastFrameScore = 20 + newState.totalScores[newState.currentRoller][0];
                    newState.frameScores[newState.currentRoller][newState.currentFrame - 1] = lastFrameScore;
                    newState.totalScores[newState.currentRoller][0] = lastFrameScore;
                }
                newState.playerScores[newState.currentRoller][newState.currentFrame][newState.currentRoll] = roll;
                newState.frameScores[newState.currentRoller][newState.currentFrame] = [];
                if (newState.currentFrame != 9) {
                    newState.currentRoll++;
                }
                this.setState(this.setNewState(newState));
            }
        } else if (roll == "/") {
            if (newState.currentRoll == 0) {
                document.getElementById("gameNotes").innerHTML = "Not a valid roll";
            } else {
                if (newState.strikeFlag[newState.currentRoller]) {
                    var currentScore = newState.totalScores[newState.currentRoller][0]
                    newState.frameScores[newState.currentRoller][newState.currentFrame - 1] = currentScore + 20;
                    newState.totalScores[newState.currentRoller][0] = currentScore + 20;
                    newState.strikeFlag[newState.currentRoller] = false;
                }
                newState.playerScores[newState.currentRoller][newState.currentFrame][newState.currentRoll] = roll;
                newState.frameScores[newState.currentRoller][newState.currentFrame] = [];
                newState.totalScores[newState.currentRoller][0] -= newState.playerScores[newState.currentRoller][newState.currentFrame][0];
                this.setState(this.setNewState(newState));
            }
        } else {
            document.getElementById("gameNotes").innerHTML = "Not a valid roll";
        }
    }

    calculateFrameScores(state) {
        var currentScore = state.totalScores[state.currentRoller][0];
        var currentFrameScores = state.frameScores[state.currentRoller];
        var thisFrame = state.playerScores[state.currentRoller][state.currentFrame];
        if (state.currentFrame > 0) {
            var lastFrame = state.playerScores[state.currentRoller][state.currentFrame - 1];
            if (lastFrame[0] == "x") {
                if (state.strikeFlag[state.currentRoller] && state.currentRoll == 0) {
                    var lastFrameScore = 20 + currentScore + thisFrame[0];
                    currentFrameScores[state.currentFrame - 2] = lastFrameScore;
                    state.totalScores[state.currentRoller][0] = lastFrameScore;
                }
                state.strikeFlag[state.currentRoller] = true;
                if (state.currentRoll == 1) {
                    state.strikeFlag[state.currentRoller] = false;
                    var lastFrameScore = 10 + currentScore + thisFrame[0] + thisFrame[1];
                    currentFrameScores[state.currentFrame - 1] = lastFrameScore;
                    currentFrameScores[state.currentFrame] = lastFrameScore + thisFrame[0] + thisFrame[1];
                }
            } else if (lastFrame[1] == "/" && state.currentRoll == 0) {
                var lastFrameScore = 10 + currentScore + thisFrame[state.currentRoll];
                currentFrameScores[state.currentFrame - 1] = lastFrameScore;
                currentFrameScores[state.currentFrame] = lastFrameScore + thisFrame[state.currentRoll];
            } else {
                currentFrameScores[state.currentFrame] = currentScore + thisFrame[state.currentRoll];
            }
        } else {
            currentFrameScores[state.currentFrame] = currentScore + thisFrame[state.currentRoll];
        }
        return currentFrameScores;
    }

    handleTenthFrame(state, roll) {
        if (parseInt(roll) >= 0) {
            if (roll != "10") state.playerScores[state.currentRoller][state.currentFrame][state.currentRoll] = parseInt(roll);
            
            var newScore = state.totalScores[state.currentRoller][0] + parseInt(roll) + 10;
            if (state.playerScores[state.currentRoller][state.currentFrame][0] == "x") {
                newScore+=10;
            }
            state.frameScores[state.currentRoller][state.currentFrame]=newScore;
            state.totalScores[state.currentRoller][0] = newScore;
            this.setState(this.setNewState(state));
        } else if (roll == "x") {
            state.playerScores[state.currentRoller][state.currentFrame][state.currentRoll] = roll;
            this.handleTenthFrame(state,"10");
        } else if (roll == "/" && state.playerScores[state.currentRoller][state.currentFrame][0] == "x") {
            state.playerScores[state.currentRoller][state.currentFrame][state.currentRoll] = roll;
            this.handleTenthFrame(state,"10");
        } else {
            document.getElementById("gameNotes").innerHTML = "Not a valid roll";
        }
    }

    setNewState(state) {
        var theRoll = state.playerScores[state.currentRoller][state.currentFrame][state.currentRoll];
        if (state.currentRoll == 0) {
            state.currentRoll++;
        } else if (state.currentRoll == 1
            && state.currentFrame == 9
            && (theRoll == "x" || theRoll == "/")) {
            state.currentRoll++;
        } else {
            state.currentRoll = 0;
            this.moveToNextBowler(state);
        }
        return (state);
    }

    moveToNextBowler(state) {
        if (state.currentRoller == state.numberOfPlayers - 1
            && state.currentFrame == 9) {
            this.gameOver();
        } else if (state.currentRoller == state.numberOfPlayers - 1) {
            state.pinsRemaining = 10;
            state.currentRoller = 0;
            state.currentFrame++;
        } else {
            state.currentRoller++;
            state.pinsRemaining = 10;
        }
    }

    gameOver() {
        var roller = document.getElementById("roller");
        roller.innerHTML = '';
        var highScore = 0;
        var index;
        for (var i = 0; i < this.state.numberOfPlayers; i++) {
            var score = this.state.totalScores[i][0];
            if (score > highScore) {
                highScore = score;
                index = i;
            }
        }
        var winner = this.state.players[index];
        roller.innerHTML = "<h2>Game Over! " + winner + " wins!</h2>";
    }

    calculateTotalScore(scores) {
        console.log(scores);
        const flatten = (arr) => arr.reduce((flat, next) => flat.concat(next), []);
        var merged = flatten(scores);
        const reducer = (accumulator, currentValue) => {
            if (currentValue >= 0) {
                return (accumulator + currentValue)
            } else {
                return accumulator
            }
        };
        var score = merged.reduce(reducer, 0);


        return score;
    }

    render() {
        var rows = [];
        for (var i = 0; i < this.state.numberOfPlayers; i++) {
            if (this.state.currentRoller == i) {
                rows.push(<PlayerFrames
                    key={i}
                    playerName={this.state.players[i]}
                    rollScores={this.state.playerScores[i]}
                    totalScore={this.state.totalScores[i]}
                    roll={true}
                    frameScores={this.state.frameScores[i]}
                />);
            } else {
                rows.push(<PlayerFrames
                    key={i}
                    playerName={this.state.players[i]}
                    rollScores={this.state.playerScores[i]}
                    totalScore={this.state.totalScores[i]}
                    roll={false}
                    frameScores={this.state.frameScores[i]}
                />);
            }
        }
        return (
            <div>
                <div id="frames">
                    <table id='scoresheet' className='scoresheet' cellPadding='1' cellSpacing='0'>
                        <thead>
                            <tr>
                                <th colSpan='20'>Player name</th>
                                <th colSpan='10'> 1 </th>
                                <th colSpan='10'> 2 </th>
                                <th colSpan='10'> 3 </th>
                                <th colSpan='10'> 4 </th>
                                <th colSpan='10'> 5 </th>
                                <th colSpan='10'> 6 </th>
                                <th colSpan='10'> 7 </th>
                                <th colSpan='10'> 8 </th>
                                <th colSpan='10'> 9 </th>
                                <th colSpan='15'> 10 </th>
                                <th colSpan='20'> Total Score </th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            {rows}
                        </tbody>
                    </table>
                </div>
                <div id="roller">
                    <p>Enter a roll! (number of pins remaining: {this.state.pinsRemaining})</p>
                    <p>Valid roll entry: Integer lte number of pins remaining, 'x', or ' / '.</p>
                    <input id="roll" name="roll" type="text" onChange={this.handleInputChange}></input>
                    <p id="gameNotes"></p>
                </div>
            </div>
        );
    }
}