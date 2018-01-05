import 'window/theme';

import React from 'react';
import renderer from 'react-test-renderer';

// shallow + redux
import { MuiButton } from './MuiButton';

it('renders correctly', () => {
	const tree = renderer
		.create(
				<MuiButton><b>Save Changes</b></MuiButton>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
