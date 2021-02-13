import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const ListItemComponent = ({ name, bio, link }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	return (
		<div className='d-flex justify-content-between ListItemComponent'>
			<div>
				<h4>Name: {name}</h4>
				<h4>Bio: {bio}</h4>
				<h4>
					Link: <a href={link}>{link}</a>
				</h4>
			</div>
			<div>
				<Button variant='outline-primary' onClick={() => setIsFavorite((val) => !val)}>
					{isFavorite ? 'Remove Favorite' : 'Add Favorite'}
				</Button>
			</div>
		</div>
	);
};

export default ListItemComponent;
