import React, { useEffect, useState } from 'react';
import ListItemComponent from './ListItemComponent';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';

const Author = () => {
	const [pageNumber, setpageNumber] = useState(1);
	const [authors, setAuthors] = useState([]);
	const [loading, setLoading] = useState(true);

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
		// localStorage.clear();

		let favs = JSON.parse(localStorage.getItem('favs'));
		if (favs) {
			var favIds = favs.map((fav) => fav._id);
		}

		fetch(`https://api.quotable.io/authors?limit=10&skip=${pageNumber * 10}`)
			.then((res) => res.json())
			.then(({ results }) => {
				let newRes = [];

				results.forEach((result) => {
					if (favIds) {
						favIds.forEach((favId) => {
							result._id === favId ? (result.isFav = true) : (result.isFav = false);
						});
					} else {
						result.isFav = false;
					}

					newRes.push(result);
				});

				setAuthors(newRes);
			})
			.then(() => setLoading(false))
			.catch((err) => console.log('fetch quote err', err));
	}, [pageNumber]);

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
					<div className='mt-5 d-flex justify-content-center'>
						<Pagination>
							<Pagination.Prev
								onClick={() => {
									pageNumber > 1 && setpageNumber((no) => no - 1);
									window.scrollTo(0, 0);
								}}
							/>
							{pageNumber === !1 && <Pagination.Item>{1}</Pagination.Item>}

							<Pagination.Item active>{pageNumber}</Pagination.Item>

							<Pagination.Next
								onClick={() => {
									setpageNumber((no) => no + 1);
									window.scrollTo(0, 0);
								}}
							/>
						</Pagination>
					</div>
				</div>
			)}
		</div>
	);
};

export default Author;
