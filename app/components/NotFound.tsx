// GLOBALS
import { Link } from '@remix-run/react';

// COMPONENTS
import { ContainerCenter } from './ContainerCenter';

export const NotFound: React.FC = () => {
	return (
		<ContainerCenter className='jdg-404-container-center'>
			<h2>Sorry, that post was not found.</h2>
			<Link to='/posts'>View all posts</Link>
		</ContainerCenter>
	);
};
