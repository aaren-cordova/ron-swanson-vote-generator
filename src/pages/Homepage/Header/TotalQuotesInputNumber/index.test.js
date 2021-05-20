import renderer from 'react-test-renderer';
import TotalQuotesInputNumber from './index';


let props;

function render() {
    return <TotalQuotesInputNumber {...props}/>;
}

beforeEach(() => {
    props = {
        totalQuotes: 0,
        setTotalQuotes: jest.fn(),
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

test('@totalQuotes=2 matches the snapshot', () => {
    props.totalQuotes = 2;
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('@totalQuotes=4 matches the snapshot', () => {
    props.totalQuotes = 4;
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
