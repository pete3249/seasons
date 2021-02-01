import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner'

class App extends React.Component {
    // App component is borrowing functionality from React.Component class
    // When we define constructor function in our class, we are overriding constructor function of React.Component
    // To make sure Parent function gets called, call super(props), which is reference to Parent constructor function
    // constructor(props) {
        // super(props);
        // THIS IS THE ONLY TIME WE DIRECTLY ASSIGN STATE
        // this.state = { lat: null, errorMessage: '' };
        // initializing property inside of state object
        // null means we do not know yet what the latitude is
    //}

    // the abbreviated sytax below is doing the exact same thing as the constructor function
    // initialized as an instance property (babel moves it back into constructor)
    state = { lat: null, errorMessage: ''}
    
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            // success callback, will not be invoked until after location is returned (some point in the future)
            // to update state object, called setState()
            position => this.setState({lat : position.coords.latitude}),
                // we did not write this.state.lat = position.coords.latitude
                // NEVER WRITE ABOVE
            err => this.setState({errorMessage: err.message})
        );
    }

    renderContent() {
        if(this.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if(!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return < Spinner message="Please accept location request" />
    }
    
    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(<App />,document.querySelector("#root"));