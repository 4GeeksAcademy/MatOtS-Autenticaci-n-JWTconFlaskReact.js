import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	function logOut() {
		localStorage.removeItem("token")
		dispatch({ type: "USER_LOGOUT"})
		navigate('/login');
	}
	

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				{store.userAuth === true ?
					<div className="ml-auto">
						<button className="btn btn-primary" onClick={logOut}>LogOut</button>
					</div>
					:
					null
				}
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};