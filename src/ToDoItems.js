import React, {Component} from "react";


class ToDoItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };

        this.createTasks = this.createTasks.bind(this);
    }

    createTasks(item) {
        return <li onClick={() => this.complete(item.key)}
                   key={item.key}
                   className ={item.active ? "listItem  completed" : "listItem"}
                    hidden={!item.display}>{item.active ? 
                    <div>
                    <strike> {item.text}</strike> 
                    <button onClick={(e) => this.delete(item.key,e)}> delete </button>
                    </div>
                    : item.text} </li>

    }


    delete(key) {
        this.props.delete(key);
    }



    complete(key){
        this.props.completeItem(key);
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);
        var checked = React.createElement('input', {type: 'checkbox', defaultChecked: false});

        return (<div>
                    <ul className = "list">{listItems}</ul>
                </div>
        );
    }
}

export default ToDoItems;