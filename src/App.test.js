import renderer from 'react-test-renderer';
import App from './App';


let props;

function render() {
    return <App {...props}/>;
}

beforeEach(() => {
    props = {};

});

test('matches the snapshot', () => {
    let component = renderer.create(render());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
