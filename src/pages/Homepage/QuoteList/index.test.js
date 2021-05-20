import defineMatchMediaMock from '../../../testHelpers/mocks/defineMatchMediaMock';
import renderer from 'react-test-renderer';
import QuoteList from './index';

let props;

function render() {
    return <QuoteList {...props}/>;
}

beforeEach(() => {
    defineMatchMediaMock();
    props = {
        quotes: [],
        currentVote: {id: '', value: ''},
        setCurrentVote: jest.fn(),
    };
});

test('matches the snapshot', () => {
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@className="my-class-name" matches the snapshot', () => {
    props.className = 'my-class-name';
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
//
// test('@quotes=[](3) @currentVote={id: "1", value: "a"} matches the snapshot', () => {
//     props.quotes = [{id: "1", value: "a"}, {id: "2", value: "b"}, {id: "3", value: "c"}]
//     props.currentVote = {id: "1", value: "a"};
//
//     let component = renderer.create(render());
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });

