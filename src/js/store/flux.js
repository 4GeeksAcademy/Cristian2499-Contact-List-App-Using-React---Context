import { json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// data global 
			apiUrl: "https://playground.4geeks.com/contact",
			agenda: [],
		},
		actions: {
			// modificar la informacion global
			getAgenda: async () => {
				const store = getStore();
				try {
					const response = await fetch(`${store.apiUrl}/agendas/Cristian2499`)
					if (!response.ok) {
						throw new Error("there has been an error");
					}
					const data = await response.json();
					console.log(data);
					setStore({ agenda: data.contacts });
				} catch (error) {
					console.log(error);
				}
			},
			createUser: async () => {
				const store = getStore();
				const response = await fetch(`${store.apiUrl}/agendas/Cristian2499`, { method: "POST" })
				const data = await response.json()
				// if (response.ok) {
				// 	getAgenda();
				// }
			},
			createContact: async (contact) => {
				const store = getStore()
				const actions = getActions()
				try {
					const response = await fetch(`${store.apiUrl}/agendas/Cristian2499/contacts`,
						{
							method: "POST",
							body: JSON.stringify(contact),
							headers: {
								"Content-type": "application/json",
							},
						}
					);
					if (response.status == 404) {
						actions.createUser();
						actions.createContact(contact);
					}
					if (response.ok) {
						const data = await response.json();
						setStore({ agenda: [...store.agenda, data] }) // esto es para que cuando se agregue un usuario no se tenga que cargar la paguina de nuevo si no que al oprimir el boton ya el contacto se agregue sin tener que voler a cargar la pagina
						alert("creaste un usuario");
					}
				} catch (error) {
					console.log(error)
				}
			},
			editContact: async (id, contact) => {
				const store = getStore();
				const actions = getActions();
				try {
					const response = await fetch(`${store.apiUrl}/agendas/Cristian2499/contacts/${id}`, {
						method: "PUT",
						body: JSON.stringify(contact),
						headers: {
							"Content-type": "application/json",
						},
					});
					const data = await response.json();
					if (response.ok) {
						actions.getAgenda();
					}
				} catch (error) {
					console.log(error);
				};
			},
			deleteContact: async (id) => {
				try {
					const store = getStore();
					const response = await fetch(`${store.apiUrl}/agendas/Cristian2499/contacts/${id}`, {
						method: "DELETE",
					});
					if (!response.ok) {
						alert("No se puede borrar el contacto");
						throw new Error("No se pudo borrar el contacto")
					} else {
						const filteredContact = store.agenda.filter((contact) => contact.id !== id);
						setStore({ agenda: filteredContact })
					}
				} catch (error) {
					console.log(error)
				}
			},
		}
	};
};

export default getState;
