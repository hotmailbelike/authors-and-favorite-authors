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

	useEffect(() => {
		setLoading(true);
		fetch(`https://api.quotable.io/authors?limit=10&skip=${pageNumber * 10}`)
			.then((res) => res.json())
			.then(({ results }) => setAuthors(results))
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
						{authors.map(({ bio, link, name, _id }) => (
							<Col className='mt-3' key={_id} xs={6}>
								<ListItemComponent
									key={_id}
									name={name}
									bio={bio}
									link={link}
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
