import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import './AddAuthorForm.css';

class AuthorForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            imageUrl:'',
            books:[],
            bookTemp:''
        }
    }
    onFieldChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.addAnAuthor(this.state);
    }
    handleAddBook(event){
        this.setState({
            books:this.state.books.concat([this.state.bookTemp]),
            bookTemp:''
        })
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="AddAuthorForm_input">
                <label htmlFor="name">Name</label>
                <input onChange={this.onFieldChange.bind(this)} type="text" name="name" value={this.state.name}></input>
            </div>
            <div className="AddAuthorForm_input">
                <label htmlFor="imageUrl">Image</label>
                <input onChange={this.onFieldChange.bind(this)} type="text" name="imageUrl" value={this.state.imageUrl}></input>
            </div>
            <div className="AddAuthorForm_input">
                {this.state.books.map((book)=><p key={book}>{book}</p>)}
                <label htmlFor="bookTemp">Books</label>
                <input onChange={this.onFieldChange.bind(this)} type="text" name="bookTemp" value={this.state.bookTemp}></input>
                <button type="button" onClick={this.handleAddBook.bind(this)} >Add</button>
            </div>
            <button className="btn btn-primary">
                Add
            </button>
        </form>
        )

    }
}
const AddAuthorForm = ({match,onAddAuthor}) => {
    return(
        <div className="AddAuthorForm">
            <h1>Add Author Form</h1>
            <AuthorForm addAnAuthor={onAddAuthor}/>
        </div>
    )
}
function mapDispatchToProps(dispatch,props){
    return{
        onAddAuthor:(author)=>{
            dispatch({type:'ADD_AUTHOR',payload:author});
            props.history.push('/');
        }
    }
}
function mapStateToProps(){

}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddAuthorForm));