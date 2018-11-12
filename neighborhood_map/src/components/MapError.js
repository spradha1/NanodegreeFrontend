import React, {Component} from 'react';
import '../App.css';

class MapError extends Component {
    state = {
        errorPage: false,
        loadTime: null
    }

    // wait for a while for page to load before rendering error page
    componentDidMount = () => {
        let time = window.setTimeout(this.showError, 1500);
        this.setState({loadTime: time});
    }

    componentWillUnmount = () => {
        window.clearTimeout(this.state.loadTime);
    }

    showError = () => {
        this.setState({errorPage: true});
    }

    render = () => {
        return (
            <div>
                {this.state.errorPage ? (
                    <div className='errorPage'>
                        <h1>Error</h1>
                        <p>The page could not load possibly due to a network error. Please try again.</p>
                    </div>
                    ) : 
                    <p className='loadingPage'>The page is loading. Thank you for your patience.</p>
                }
            </div>
        )
    }
}

export default MapError;