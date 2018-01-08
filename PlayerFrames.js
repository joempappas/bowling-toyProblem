class PlayerFrames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: props.playerName,
            frameScores: props.frameScores,
            totalScore: props.totalScore,
            currentRoll: props.roll,
            rollScores: props.rollScores
        };
    }

    render() {
        return (
            <tr>
                <td colSpan='20'>{this.state.playerName}</td>
                <td colSpan='10'>
                    <FrameTable
                        data={this.state.rollScores[0]}
                        frameScore={this.state.frameScores[0]}
                    />
                </td>
                <td colSpan='10'>
                    <FrameTable
                        data={this.state.rollScores[1]}
                        frameScore={this.state.frameScores[1]}
                    />
                </td>
                <td colSpan='10'>
                    <FrameTable
                        data={this.state.rollScores[2]}
                        frameScore={this.state.frameScores[2]}
                    />
                </td>
                <td colSpan='10'>
                    <FrameTable
                        data={this.state.rollScores[3]}
                        frameScore={this.state.frameScores[3]}
                    />
                </td>
                <td colSpan='10'>
                    <FrameTable
                        data={this.state.rollScores[4]}
                        frameScore={this.state.frameScores[4]}
                    />
                </td>
                <td colSpan='10'>
                    <FrameTable
                        data={this.state.rollScores[5]}
                        frameScore={this.state.frameScores[5]}
                    />
                </td>
                <td colSpan='10'>
                    <FrameTable
                        data={this.state.rollScores[6]}
                        frameScore={this.state.frameScores[6]}
                    />
                </td>
                <td colSpan='10'>
                    <FrameTable
                        data={this.state.rollScores[7]}
                        frameScore={this.state.frameScores[7]}
                    />
                </td>
                <td colSpan='10'>
                    <FrameTable
                        data={this.state.rollScores[8]}
                        frameScore={this.state.frameScores[8]}
                    />
                </td>
                <td colSpan='15'>
                    <FrameTable
                        data={this.state.rollScores[9]}
                        frameScore={this.state.frameScores[9]}
                    />
                </td>
                <td colSpan='20'>
                    {this.state.totalScore[0]}
                </td>
            </tr>
        );
    }
}

const FrameTable = ({ data, frameScore }) => (
    <div>
        <div className="rollScores">
            {(() => {
                if (data[2] != null) {
                    return (<p>{data[2]}</p>);
                }
            })()}
            <p>{data[1]}</p>
            <p>{data[0]}</p>
        </div>
        <div className="frameScores">
            <p>{frameScore}</p>
        </div>
    </div>
)
/*
 
*/