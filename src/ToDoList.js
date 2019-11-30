import React, {Component} from "react";
import ToDoItems from "./ToDoItems";
import "./ToDoList.css";

class ToDoList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.completeItem = this.completeItem.bind(this);
        this.applyNoFilter = this.applyNoFilter.bind(this);
        this.applyActiveFilter = this.applyActiveFilter.bind(this);
        this.applyCompletedFilter =this.applyCompletedFilter.bind(this);
    }

    addItem(e) {
        if (this._inputElement !== "") {
            var newItem = {
                active: false,
                display: true,
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {

                return {
                    items: prevState.items.concat(newItem)
                };
            });


        }
        this._inputElement.value = "";

        e.preventDefault();
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key)

        });

        this.setState({
            items: filteredItems
        });
    }

    completeItem(key){
        let item = this.state.items.find(function (item) {
            return (item.key === key)
        });
        console.log(item);
        item.active = !item.active;
        this.forceUpdate();
    }

    applyNoFilter(){
        this.state.items.forEach(item => {
            item.display = true;
        });

        this.forceUpdate();
    }
    applyActiveFilter(){
        this.state.items.forEach(item => {
            item.display = !item.active;
        });
        this.forceUpdate();
    }

    applyCompletedFilter(){
        this.state.items.forEach(item => {
            item.display = item.active;
        });

        this.forceUpdate();
    }


    render() {
        return (
            <div className = 'TodoList'>
                <div>
                    <h1>My ToDoList</h1>
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                               placeholder="enter task">
                        </input>
                        <button type="submit">add</button>
                    </form>
                    <div className="btn-group">
                        <button className="button" onClick={this.applyNoFilter}>No filters</button>
                        <button className="button" onClick={this.applyActiveFilter}>Active</button>
                        <button className="button" onClick={this.applyCompletedFilter}>Completed</button>
                   
                    </div>
                </div>
                <ToDoItems entries={this.state.items}
                           delete={this.deleteItem}
                           completeItem={this.completeItem}

                />
            </div>

        );
    }
}

export default ToDoList;


