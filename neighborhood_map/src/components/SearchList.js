import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import '../App.css';

class SearchList extends Component {
    state = {
        query: "",
        showList: false
    }

    styles = {
        listBox: {
            padding: "10px 15px",
            width: "250px",
        },
        inputField: {
            margin: "20px auto",
            width: "100%",
            padding: "2px",
            border: "1px solid blue"
        }
    }

    // invoke App's filter on change of query
    updateQuery = (text) => {
        this.setState({ query: text });
        this.props.filterList(text);
    }

    render = () => {
        return (
            <div>
                <Drawer open={this.props.showList} onClose={this.props.toggle}>
                    <div style={this.styles.listBox}>
                        <input style={this.styles.inputField}
                               name="input field"
                               type="text"
                               placeholder="search query"
                               onChange={e => this.updateQuery(e.target.value)}
                               value={this.state.query}
                        />
                        <ul className="searchList">
                            {this.props.places && this.props.places.map((place, index) => {
                                return (
                                    <li className="restaurantItem" key={index}>
                                        <button className="itemButton" 
                                                key={index}
                                                onClick={e => this.props.onClickPlace(index)}
                                        >
                                        {place.name}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default SearchList;