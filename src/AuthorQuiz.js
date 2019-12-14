import React from 'react';
import './bootstrap.min.css';
import './AuthorQuiz.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Hero = ()=>{
    return(
        <div className="row">
            <div className="jumbotron col-10 offset-1">
                <h1>Author Quiz</h1>
                <p>Select the book written by the authors</p>
            </div>
        </div>
    )
}
const Book = ({title,onclick})=>{
    return(
        <div className="answer" onClick={()=>onclick(title)}>
            <h5>{title}</h5>
        </div>
    )
}
const Turn = ({author,books,highlight,onAnswerSelected})=>{
    function highlightToBackColor(highlight){
        const mapping= {
            'none':'',
            'correct':'green',
            'wrong':'red'
        }
        return mapping[highlight]
    }

    return(<div className="row turn" style={{backgroundColor:highlightToBackColor(highlight)}}>
        <div className="col-4 offset-1">
            <img src={author.imageUrl} className="authorimage" alt="Author" />
        </div>
        <div className="col-5">
                {books.map((title)=><Book onclick={onAnswerSelected} key={title} title={title}></Book>)}
            </div>
    </div>)
}
Turn.propTypes = {
    author:PropTypes.shape({
        name:PropTypes.string.isRequired,
        imageUrl:PropTypes.string.isRequired,
        imageSource:PropTypes.string.isRequired,
        books:PropTypes.arrayOf(PropTypes.string)
    })
}
const Continue = ({show,onContinue})=>{
    return(<div className="row continue">
            {show?(
        <div className="col-11">
            <button onClick={onContinue} className="btn btn-primary btn-lg float-right">Continue</button>
        </div>
    ):null}
            </div>)
}
const Footer = ()=>{
    return(
        <footer>All the image are copyrighted by <a href="">WikiCommons</a></footer>
    )
}
const AuthorQuiz = ({turnData,highlight,onAnswerSelected,onContinue})=>{
    return(
        <div className="container-fluid">
            <Hero />
            <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
            <Continue show={highlight==='correct'} onContinue={onContinue} />
            <p><Link to="/add">Add an Author</Link></p>
            <Footer />
        </div>
    )
}
function mapStateToProps(state){
    return{
        turnData:state.turnData,
        highlight:state.highlight
    }
}
function mapDispatchToProps(dispatch){
    return{
        onAnswerSelected:(answer)=>{
            dispatch({type:'ANSWER_SELECTED',payload:answer})
        },
        onContinue:()=>{
            dispatch({type:'CONTINUE'})
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AuthorQuiz);