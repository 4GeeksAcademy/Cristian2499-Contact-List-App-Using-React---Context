import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext"
import { Link, useParams } from "react-router-dom"

export const AddContact = () => {
	const {store, actions} = useContext(Context);
	const [contact, setContact] = useState({
		name: "",
		phone: "",
		email: "",
		address: ""
	})
	const params = useParams();
	console.log(params);
	function handleChange(event) {
		setContact({...contact, [event.target.name]: event.target.value })
	};

	function handleSubmit(event){
		event.preventDefault();
		if (!params.id) {
			actions.createContact(contact)
		} else {
			actions.editContact(params.id, contact)
		}	
	}
	useEffect(() => {
		if (params.id && store.agenda.length > 0) {
			const currentContact = store.agenda.find(item => item.id == params.id)
			setContact(currentContact)
		}
	},[params.id, store.agenda])
	return (
		<div className="d-flex justify-content-center aling-items-center">
			<div className="card w-75">
				<div className="card-header">{!params.id ? "Crea un contacto nuevo" : `Editando el contacto ${contact.email}`}</div>
				<form action="" className="card-body" onSubmit={handleSubmit}>
					<div>
						<label>Nombre</label>
						<input 
						name="name"
						value={contact.name}
						onChange={(event) => handleChange(event)}
						className="form-control" placeholder="pon tu nombre y apellido" />
					</div>
					<div>
						<label>telefono</label>
						<input 
						name="phone"
						value={contact.phone}
						onChange={(event) => handleChange(event)}
						type="number" className="form-control" placeholder="pon tu numero de telefono" />
					</div>
					<div>
						<label>email</label>
						<input
						name="email"
						value={contact.email}
						onChange={(event) => handleChange(event)}
						className="form-control" placeholder="pon tu email" />
					</div>
					<div>
						<label>direccion</label>
						<input 
						name="address"
						value={contact.address}
						onChange={(event) => handleChange(event)}
						className="form-control" placeholder="pon tu direccion" />
					</div>
					<div className="d-flex justify-content-between">
					<button className="btn btn-primary mt-3" onClick={handleSubmit}>
					{!params.id ? "Crea tu contacto" : "Editar contacto"}
					</button>
					<Link to="/" className="btn btn-warning mt-3">volver a lista de contactos</Link>
					</div>
				</form>
			</div>
		</div>
	)

};


