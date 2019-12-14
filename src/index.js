import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider,connect} from 'react-redux';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import {shuffle,sample} from 'underscore';
import {BrowserRouter,Route,withRouter} from 'react-router-dom';

const authors =[
    {
        name:'Mark Twain',
        imageUrl:'images/authors/marktwain.jpg',
        imageSource:'Wikipedia Commons',
        writtenBookIndex:0,
        books:['The adventures of Huckleburry fin','The NameSake','The Alchemist','Ram,The Scion of Ikshvaku']
    },
    {
        name:'Ruskin Bond',
        imageUrl:'images/authors/RuskinBond.jpg',
        imageSource:'Wikipedia Commons',
        writtenBookIndex:0,
        books:['The Monday Morning','The White Tiger','Who will cry when you die']
    },
    {
        name:'Sudha Murthy',
        imageUrl:'images/authors/sudhamurthy.jpg',
        imageSource:'Wikipedia Commons',
        writtenBookIndex:0,
        books:['Spouse','Men Are From Mars,Women are from Venu']
    }
]
const getTurnData = (authors)=>{
    const allBooks = authors.reduce(function(p,c,i){
        return p.concat(c.books);
    },[]);
    const randomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(randomBooks);
    return {
        books:randomBooks,
        author:authors.find((author)=>
            author.books.some((title)=>
                (title === answer)
            )
             
        )
    }

}


function reducer(state={authors,turnData:getTurnData(authors),highlight:''},action) {
    switch(action.type){
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book)=>book===action.payload);
            return Object.assign({},state,{
                highlight:isCorrect?'correct':'wrong'
            })

        case 'CONTINUE':
            return Object.assign({},state,{highlight:'',turnData:getTurnData(authors)});
        case 'ADD_AUTHOR':
            return Object.assign({},state,{
                authors:state.authors.concat(action.payload)
            })
        default:
            return state;
    }
}
let store = createStore(reducer);

// const App = ()=>{
//     return (
//     <Provider store={store}>
//         <AuthorQuiz />
//     </Provider>
//     );
// }
// const AuthorWrapper = withRouter(({history})=>{
//     return (
//     <Provider store={store}>
//     <AddAuthorForm onAddAuthor={(author)=>{
//         author.imageSource = 'Wiki Common Images';
//         authors.push(author);
//         history.push('/')
//     }} />
//     </Provider>
// );
// }
// );
function render(){
    ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
        <React.Fragment>
            <Route exact path="/" component={AuthorQuiz}/>
            <Route path="/add" component={AddAuthorForm} />
        </React.Fragment>
        </Provider>

    </BrowserRouter>,
    document.getElementById('root')); 
}
render();
  