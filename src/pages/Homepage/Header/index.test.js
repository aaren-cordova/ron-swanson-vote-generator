import renderer from 'react-test-renderer';
import Header from './index';
import PropTypes from 'prop-types';


let props;

function render() {
    return <Header {...props}/>;
}

beforeEach(() => {
    props = {
        quotes: [],
        filteredQuotes: [],
        theme: '',
        totalQuotes: 0,
        setSearchTerm: jest.fn(),
        setTheme: jest.fn(),
        setTotalQuotes: jest.fn(),
        setCurrentVote: jest.fn(),
    };

});

test('matches the snapshot', () => {
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@className="some-class-name" matches the snapshot', () => {
    props.className = 'some-class-name';
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
