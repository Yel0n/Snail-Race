import React from 'react';
import ReactDOM from 'react-dom';
import {Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

document.addEventListener('DOMContentLoaded', function(){

    class Main extends React.Component{
        render(){
            return (
                <div>
                    <div>Player 1 name: <input placeholder='Player 1'/></div>
                    <div>Player 2 name: <input placeholder='Player 2'/></div>
                    <div><Link to='/game'>START GAME</Link></div>
                </div>
            )
        }
    }

    class Game extends React.Component{
        constructor(props){
            super(props);

            this.state = {
                start: true,
                time: 0
            }
        }
        componentDidMount(){
            this.interval = setInterval(() => {
                this.setState({
                    time: this.state.time+1
                })
            }, 1000);
            this.keysAction();

        }
        keysAction = () => {
            document.addEventListener('keyup',(e) => {
                if(this.state.start == true) {
                    let player1 = document.querySelector('#player1');
                    let player1Pos = parseInt(player1.dataset.pos);
                    let player2 = document.querySelector('#player2');
                    let player2Pos = parseInt(player2.dataset.pos);
                    if (e.keyCode == 13) {
                        player1.style.left = (player1Pos + 5) + 'px';
                        player1.dataset.pos = player1Pos + 5;
                    } else if (e.keyCode == 32) {
                        player2.style.left = (player2Pos + 5) + 'px';
                        player2.dataset.pos = player2Pos + 5;
                    }
                    if (player1Pos == 1020) {
                        this.setState({
                            start: false
                        });
                        clearInterval(this.interval)
                        console.log('Gracz 1 wygrał');
                        return false
                    }
                    if (player2Pos == 1020) {
                        this.setState({
                            start: false
                        });
                        clearInterval(this.interval)
                        console.log('Gracz 2 wygrał');
                        return false
                    }
                }
            });

        };
        render(){
            return (
                <section id='game'>
                    <div className='game'>
                        <h1 id='timer'>Time: {this.state.time}s</h1>
                        <div id='foreground'></div>
                        <div id="player1" data-pos="35"></div>
                        <div id="player2" data-pos="35"></div>
                    </div>
                </section>
            )
        }
    }

    class Template extends React.Component{
        render(){
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }
    }

    class App extends React.Component{
        render(){
            return (
                <Router history={hashHistory}>
                    <Route path='/' component={Template}>
                        <IndexRoute component={Main}/>
                        <Route path='/game' component={Game}/>
                    </Route>
                </Router>
            )
        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});