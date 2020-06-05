import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as StyledComponents from './styled-components';

configure({ adapter: new Adapter() });

global.StyledComponents = StyledComponents;
