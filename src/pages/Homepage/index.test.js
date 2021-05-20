import defineMatchMediaMock from '../../testHelpers/mocks/defineMatchMediaMock';
import renderer from 'react-test-renderer';
import HomePage from './index';

let props;

function render() {
    return <HomePage {...props}/>;
}

beforeEach(() => {
    defineMatchMediaMock();
    props = {
        error: null,
        theme: '',
        hasLoadedFromCache: false,
        quotes: [],
        totalQuotes: 9,
        filteredQuotes: [],
        currentVote: {id: '', value: ''},

        setSearchTerm: function(){},
        setTheme: function(){},
        setTotalQuotes: function(){},
        setCurrentVote: function(){},
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

test('@quotes=[](3) @currentVote={id: "1", value: "a"} matches the snapshot', () => {
    props.hasLoadedFromCache = true;
    props.quotes = [{id: "1", value: "a"}, {id: "2", value: "b"}, {id: "3", value: "c"}]
    props.currentVote = {id: "1", value: "a"};

    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@error={message: "Some Error"} matches the snapshot', () => {
    props.hasLoadedFromCache = true;
    props.error = {message: "Some Error"};

    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@error="Some Error" matches the snapshot', () => {
    props.hasLoadedFromCache = true;
    props.error = "Some Error";

    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

