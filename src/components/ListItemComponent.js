import React from 'react';
import Button from 'react-bootstrap/Button';

const ListItemComponent = ({ name, bio, link, _id, isFav, index, addFav, removeFav }) => {
	return (
		<div className='d-flex justify-content-between ListItemComponent'>
			<div style={{ width: '75%' }}>
				<h4>Name: {name}</h4>
				<h4>Bio: {bio}</h4>
				<h4>
					Link: <a href={link}>{link}</a>
				</h4>
			</div>
			<div>
				<Button
					variant='outline-primary'
					onClick={() => {
						isFav ? removeFav(index, _id) : addFav(index, bio, link, name, _id);
					}}
				>
					{isFav ? 'Remove Favorite' : 'Add Favorite'}
				</Button>
			</div>
		</div>
	);
};

export default ListItemComponent;
