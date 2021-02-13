import React, { useEffect, useState } from 'react';
import ListItemComponent from './ListItemComponent';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const FavoriteAuthor = () => {
	const [authors, setAuthors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [noFav, setNoFav] = useState(false);

	const addFav = (index, bio, link, name, _id) => {
		// console.log('addFav -> index', index);
		let temp = [...authors];
		temp[index].isFav = true;
		setAuthors(temp);

		let favs = JSON.parse(localStorage.getItem('favs'));
		if (!favs) {
			favs = [
				{
					bio,
					link,
					name,
					_id,
					isFav: true,
				},
			];
		} else {
			favs.push({ bio, link, name, _id, isFav: true });
		}
		localStorage.setItem('favs', JSON.stringify(favs));
	};

	const removeFav = (index, _id) => {
		console.log('removeFav -> _id', _id);
		let temp = [...authors];
		temp[index].isFav = false;
		setAuthors(temp);
		let favs = JSON.parse(localStorage.getItem('favs'));

		if (favs) {
			favs = favs.filter((fav) => fav._id !== _id);
			localStorage.setItem('favs', JSON.stringify(favs));
		}
	};

	useEffect(() => {
		setLoading(true);

		let favs = JSON.parse(localStorage.getItem('favs'));
		if (favs.length > 0) {
			setAuthors(favs);
			setNoFav(false);
		} else {
			setNoFav(true);
		}

		setLoading(false);
	}, [authors]);

	// useEffect(() => {
	// 	console.log(authors);
	// }, [authors]);

	if (noFav) {
		return (
			<div style={{ marginLeft: '3rem', marginTop: '2rem' }}>
				You have no saved Favorite Author
			</div>
		);
	}
	return (
		<div style={{ marginLeft: '3rem', marginTop: '2rem' }}>
			{loading ? (
				<div>
					<Spinner animation='border' variant='success' />
				</div>
			) : (
				<div>
					{' '}
					<Row style={{ width: '80rem' }}>
						{authors.map(({ bio, link, name, _id, isFav }, index) => (
							<Col className='mt-3' key={_id} xs={6}>
								<ListItemComponent
									_id={_id}
									name={name}
									bio={bio}
									link={link}
									isFav={isFav}
									addFav={addFav}
									removeFav={removeFav}
									index={index}
								></ListItemComponent>
							</Col>
						))}
					</Row>
				</div>
			)}
		</div>
	);
};

export default FavoriteAuthor;
