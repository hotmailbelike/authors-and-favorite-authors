import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Author from './components/Author';
import FavoriteAuthor from './components/FavoriteAuthor';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<div className='d-flex'>
			<BrowserRouter>
				<Sidebar></Sidebar>
				<div>
					<Switch>
						<Route path='/' exact component={Author} />
						<Route path='/favorite_author' exact component={FavoriteAuthor} />
						<Route
							path='/'
							render={() => (
								<div className='ml-5'>
									<h1>404</h1>
								</div>
							)}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
