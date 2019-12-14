import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme,{mount,shallow,render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

const state = {
    turnData:{
        books:[],
        author:    {
            name:'Mark Twain',
            imageUrl:'images/authors/marktwain.jpg',
            imageSource:'Wikipedia Commons',
            writtenBookIndex:0,
            books:['The adventures of Huckleburry fin','The NameSake','The Alchemist','Ram,The Scion of Ikshvaku']
        }
    },
    hightlight:'none'
}
describe("Author Quiz",()=>{
    it("renders without crashing",()=>{
        const div = document.createElement("div");
        ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>,div);
    })
    describe("No answer is Selected",()=>{
        let wrapper;
        beforeAll(()=>{
            wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={()=>{}} />);
        });
        it("should have no background color",()=>{
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
        });
    });
    describe("When Wrong  answer is Selected",()=>{
        let wrapper;
        beforeAll(()=>{
            wrapper = mount(<AuthorQuiz {...(Object.assign({},state,{hightlight:'wrong'}))} onAnswerSelected={()=>{}} />);
        });
        it("should have red background color",()=>{
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
        });
    });
    describe("When Wrong  answer is Selected",()=>{
        let wrapper;
        beforeAll(()=>{
            wrapper = mount(<AuthorQuiz {...(Object.assign({},state,{hightlight:'wrong'}))} onAnswerSelected={()=>{}} />);
        });
        it("should have red background color",()=>{
            expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
        });
    });
})