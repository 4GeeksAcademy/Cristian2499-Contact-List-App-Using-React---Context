import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"




export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="container mx-auto">
			<Link to="/Add" className="w-100 btn btn-primary">Añadir un nuevo contacto</Link>
			{store.agenda.map((contact) => {
				return (
					<div className="card" key={contact.id}>
						<div className="d-flex">
							<div><img src="https://img.freepik.com/vector-premium/imagen-perfil-avatar-hombre-ilustracion-vectorial_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1717977600&semt=sph" className="img-thumbnail" /></div>
							<div className="ms-5 mt-5">
								<div><h2 className="ms-2">{contact.name}</h2></div>
								<div className="d-flex"><i class="fas fa-map-marker-alt pt-3 ms-2"></i><h2 className="text-secondary ms-2">{contact.address}</h2></div>
								<div className="d-flex"><i class="fas fa-phone pt-3 ms-2"></i><h2 className="text-secondary ms-2">{contact.phone}</h2></div>
								<div className="d-flex"><i class="fas fa-envelope pt-3 ms-2"></i><h2 className="text-secondary ms-2">{contact.email}</h2></div>
								<div className="mt-3 d-flex">
									<Link to={`/edit/${contact.id}`} className="btn btn-primary mt-3 ms-3">Editar contacto</Link>
									<button className="btn btn-danger mt-3 ms-3" onClick={() => actions.deleteContact(contact.id)}>
										Eliminar contacto
									</button>
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>

	)

};
