import React, { Component } from 'react';

class Program extends Component{
    constructor(props) {
        super(props);
        this.state = {
            proScore:0,
            proList:[],
            proImpact:0,
            finalPro:0,
            conScore:0,
            conList:[],
            conImpact:0,
            finalCon:0,

            proDisplay: 'block',
            conDisplay: 'block'
        }
        this.enterPro = this.enterPro.bind(this)
        this.enterCon = this.enterCon.bind(this)
        this.finalResult = this.finalResult.bind(this)
        this.restart = this.restart.bind(this)
        this.filter = this.filter.bind(this)
    }

    filter(){
        var displayOptions = this.refs.displayOptions;
        var displayType = displayOptions.options[displayOptions.selectedIndex].text
        if (displayType == 'Both')
        {
            this.setState({proDisplay:'block'})
            this.setState({conDisplay:'block'})
            console.log('1')
        }

        else if (displayType == 'Pro Only')
        {
            this.setState({proDisplay:'block'})
            this.setState({conDisplay:'none'})
            console.log('2')
        }

        else if (displayType == 'Con Only')
        {
            this.setState({proDisplay:'none'})
            this.setState({conDisplay:'block'})
            console.log('3')
        }

        console.log(displayType)

    }

    enterPro(){
        if(this.refs.newPro.value == ''){
            alert('Please enter the name of the Pro')
        } else if(this.refs.Prosmall.checked == false && this.refs.Promedium.checked == false && this.refs.Prolarge.checked == false){
            alert('Please choose an impact level')
        } else {
            var proScore = this.state.proScore
            var propOptions = this.refs.Prooptions;
            var propability = propOptions.options[propOptions.selectedIndex].text
            if (propability == 'Unlikely') {
                proScore += 1
            } else if (propability == 'Possibly') {
                proScore += 2
            } else if (propability == 'Likely') {
                proScore += 3
            } else if (propability == 'Very Likely') {
                proScore += 4
            } else if (propability == 'Certain') {
                proScore += 5
            }
            this.setState({proScore: proScore})

            var newPro = this.refs.newPro.value
            var proList = this.state.proList
            proList.push(newPro)
            this.setState({proList: proList})
            this.refs.newPro.value = ''

            var impact = this.state.proImpact;
            if (this.refs.Prosmall.checked == true) {
                impact += 1
            } else if (this.refs.Promedium.checked == true) {
                impact += 2
            } else if (this.refs.Prolarge.checked == true) {
                impact += 3
            }
            this.setState({proImpact: impact})
        }
    }

    enterCon(){
        if(this.refs.newCon.value == ''){
            alert('Please enter the name of the Con')
        } else if(this.refs.Consmall.checked == false && this.refs.Conmedium.checked == false && this.refs.Conlarge.checked == false){
            alert('Please choose an impact level')
        } else {
            var conScore = this.state.conScore
            var propOptions = this.refs.Conoptions;
            var propability = propOptions.options[propOptions.selectedIndex].text
            if (propability == 'Unlikely') {
                conScore += 1
            } else if (propability == 'Possibly') {
                conScore += 2
            } else if (propability == 'Likely') {
                conScore += 3
            } else if (propability == 'Very Likely') {
                conScore += 4
            } else if (propability == 'Certain') {
                conScore += 5
            }
            this.setState({conScore: conScore})

            var newCon = this.refs.newCon.value
            var conList = this.state.conList
            conList.push(newCon)
            this.setState({conList: conList})
            this.refs.newCon.value = ''

            var impact = this.state.conImpact;
            if (this.refs.Consmall.checked == true) {
                impact += 1
            } else if (this.refs.Conmedium.checked == true) {
                impact += 2
            } else if (this.refs.Conlarge.checked == true) {
                impact += 3
            }
            this.setState({conImpact: impact})
        }
    }

    finalResult(){
        var proImpact = this.state.proImpact
        var proScore = this.state.proScore
        var conImpact = this.state.conImpact
        var conScore = this.state.conScore

        console.log('Impact Con:' + conImpact)
        console.log('Impact Pro: ' + proImpact)

        console.log('Score Con:' + conScore)
        console.log('Score Pro: ' + proScore)

        var finalPro = proScore*proImpact
        var finalCon = conScore*conImpact


        var finalResult = finalPro-finalCon;
        if(finalResult >= 100){
            this.refs.outcome.innerHTML = 'Certainly Beneficial'
        } else if(finalResult >= 65){
            this.refs.outcome.innerHTML = 'Most likely beneficial'
        } else if(finalResult >= 30){
            this.refs.outcome.innerHTML = 'Possibily Worth risk'
        } else if(finalResult >= 15){
            this.refs.outcome.innerHTML = 'May work out for you'
        }else if(finalResult >= 1){
            this.refs.outcome.innerHTML = 'Only slight gain'
        } else if(finalResult == 0){
            this.refs.outcome.innerHTML = 'Gains are equal with risk'
        } else if(finalResult <= -1){
            this.refs.outcome.innerHTML = 'Slightly risky'
        } else if(finalResult <= -15){
            this.refs.outcome.innerHTML = 'Risk slighlty outweighs gain'
        } else if(finalResult <= -30){
            this.refs.outcome.innerHTML = 'Possibily Not worth risk'
        } else if(finalResult <= -65){
            this.refs.outcome.innerHTML = 'Would not recommend'
        } else if(finalResult <= -100){
            this.refs.outcome.innerHTML = 'Dont do this'
        }

        var proList = this.state.proList
        var proHeader = document.createElement('h2');
        proHeader.innerHTML = 'Pros'
        document.getElementById('allPros').appendChild(proHeader);
        for (var i = 0; i < proList.length; i += 1) {
            var label = document.createElement('h4');
            document.getElementById('allPros').appendChild(label);
            label.innerHTML = 'Pro ' + (i+1) + ': ' + proList[i]
        }

        var proScore = document.createElement('h2');
        proScore.innerHTML = 'Score: ' + finalPro;
        document.getElementById('allPros').appendChild(proScore);

        var conList = this.state.conList
        var conHeader = document.createElement('h2');
        conHeader.innerHTML = 'Cons'
        document.getElementById('allCons').appendChild(conHeader);
        for (var i = 0; i < conList.length; i += 1) {
            var label = document.createElement('h4');
            document.getElementById('allCons').appendChild(label);
            label.innerHTML = 'Con ' + (i+1) + ': ' + conList[i]
        }

        var conScore = document.createElement('h2');
        conScore.innerHTML = 'Score: ' + finalCon;
        document.getElementById('allCons').appendChild(conScore);

        var diff = document.createElement('h2');
        diff.innerHTML = 'Difference: ' + finalResult
        document.getElementById('finalScore').appendChild(diff);
        console.log(finalResult)
    }

    restart(){
        window.location.reload();
    }

    render(){

        var style = {
            backgroundColor: 'white',
            color: 'black',
            padding: 20
        }

        var innerStyle = {
            padding:20,
            color: 'white',
            margin:'auto',
            width:'75%',
            marginBottom: 25,
            borderBottom: 'solid',
            borderBottomWidth: 1,
            borderBottomColor: 'blue',

        }

        var outerStyle = {
            border: 'solid',
            borderWidth: 1,
            borderColor: 'blue',
            padding: 10,
            backgroundColor: 'black',
            fontSize: 20
        }

        var showPro = {
            display: this.state.proDisplay
        }

        return(
            <div style={style}>
                <div style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: 'blue', backgroundColor: 'black', color:'white'}}>
                    <h1>Pro's and Con's </h1>
                </div>
                <div style={{margin:'auto', width:'75%'}}>
                <div>
                    <label style={{marginRight: 5}}>Show</label>
                    <select ref='displayOptions' style={{marginRight: 10}}>
                        <option value="both">Both</option>
                        <option value="pro">Pro Only</option>
                        <option value="con">Con Only</option>
                    </select>
                    <button onClick={this.filter}>Go</button>
                </div>
                    <div style={showPro}>
                        <h2>Pro's</h2>
                        <div style={outerStyle}>
                            <div style={innerStyle}>
                                <label>New Pro <input type='text' ref='newPro'/></label>
                            </div>
                            <div style={innerStyle}>
                                <label style={{marginRight: 10}}>Probability of Happening</label>
                                <select ref='Prooptions'>
                                    <option value="Prounlikely">Unlikely</option>
                                    <option value="Propossibly">Possibly</option>
                                    <option value="Prolikely">Likely</option>
                                    <option value="ProveryLikely">Very Likely</option>
                                    <option value="Procertain">Certain</option>
                                </select>
                            </div>
                            <div style={innerStyle}>
                                <label>Impact on final outcome</label>
                                <div style={{marginTop: 10}}>
                                    Small<input type='radio' name='impact' ref='Prosmall' style={{marginRight: 10}}/>
                                    Medium<input type='radio' name='impact' ref='Promedium' style={{marginRight: 10}}/>
                                    Large<input type='radio' name='impact' ref='Prolarge' style={{marginRight: 10}}/>
                                </div>
                            </div>
                            <button onClick={this.enterPro}>Submit</button>
                    </div>
                    </div>
                </div>
                <div>
                    <div style={{margin:'auto', width:'75%', display:this.state.conDisplay}}>
                        <h2>Con's</h2>
                        <div style={outerStyle}>
                            <div style={innerStyle}>
                            <label>New Con <input type='text' ref='newCon'/></label>
                            </div>
                            <div style={innerStyle}>
                            <label style={{marginRight: 10}}>Probability of Happening</label>
                            <select ref='Conoptions'>
                                <option value="Conunlikely">Unlikely</option>
                                <option value="Conpossibly">Possibly</option>
                                <option value="Conlikely">Likely</option>
                                <option value="ConveryLikely">Very Likely</option>
                                <option value="Concertain">Certain</option>
                            </select>
                        </div>
                        <div style={innerStyle}>
                            <label>Impact on final outcome</label>
                            <div style={{marginTop: 10}}>
                                Small<input type='radio' name='impact' ref='Consmall' style={{marginRight: 10}}/>
                                Medium<input type='radio' name='impact' ref='Conmedium' style={{marginRight: 10}}/>
                                Large<input type='radio' name='impact' ref='Conlarge' style={{marginRight: 10}}/>
                            </div>
                        </div>
                        <button onClick={this.enterCon}>Submit</button>
                    </div>
                </div>
                <button style={{fontSize:26, marginTop: 20}} onClick={this.finalResult}>Get Result</button>
                <div>
                    <button onClick={this.restart}>Refresh</button>
                    <h1 ref='outcome'></h1>
                    <div id='allPros' style={{float:'left', marginLeft: 160, display:this.state.proDisplay}}></div>
                    <div id='allCons' style={{float:'right', marginRight: 160, display:this.state.conDisplay}}></div>
                    <div id='finalScore'></div>
                </div>
                </div>
            </div>
        )
    }
}

export default Program