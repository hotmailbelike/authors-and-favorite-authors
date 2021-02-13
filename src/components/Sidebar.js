import Nav from 'react-bootstrap/Nav';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const [activeLink, setActiveLink] = useState(0);
	return (
		<div className='sidebar'>
			<Nav className='flex-column'>
				<Nav.Link>
					<Link
						to='/'
						style={activeLink === 0 ? { fontWeight: 'bold' } : {}}
						onClick={() => {
							setActiveLink(0);
						}}
					>
						Author
					</Link>
				</Nav.Link>
				<Nav.Link>
					<Link
						to='/favorite_author'
						style={activeLink === 1 ? { fontWeight: 'bold' } : {}}
						onClick={() => {
							setActiveLink(1);
						}}
					>
						Favorite Author
					</Link>
				</Nav.Link>
			</Nav>
		</div>
	);
};

export default Sidebar;
