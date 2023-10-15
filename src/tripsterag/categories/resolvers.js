import { generalRequest, getRequest } from '../../utilities';
import { serverConfigurations } from './server';

const selectedConfig1 = serverConfigurations.config1;
const URL1 = `http://${selectedConfig1.url}:${selectedConfig1.port}/${selectedConfig1.entryPoint}`;

const selectedConfig2 = serverConfigurations.config2;
const URL2 = `http://${selectedConfig2.url}:${selectedConfig2.port}/${selectedConfig2.entryPoint}`;

const selectedConfig3 = serverConfigurations.config3;
const URL3 = `http://${selectedConfig3.url}:${selectedConfig3.port}/${selectedConfig3.entryPoint}`;

const selectedConfig4 = serverConfigurations.config4;
const URL4 = `http://${selectedConfig4.url}:${selectedConfig4.port}/${selectedConfig4.entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			getRequest(URL1, ''),
		usuarioByNombre: (_, { nombre }) =>
			generalRequest(`${URL1}/${nombre}`, 'GET'),
		//////////////
		reservaById: (_, { id }) =>
			generalRequest(`${URL2}/${id}`, 'GET'),
		allBookings: (_) =>
			getRequest(URL2, ''),
		///////////////
		getRoutes: (_) =>
			getRequest(URL3, ''),
		getRoute: (_, { id }) =>
			generalRequest(`${URL3}/${id}`, 'GET'),
		///////////////
		FlightByOrigDest: (_, parameters ) =>
			generalRequest(`${URL4}/flight`, 'GET',parameters),
	},
	Mutation: {
		createUsuario: (_, { usuario }) =>
			generalRequest(`${URL1}`, 'POST', usuario),
		updateUsuario: (_, { email, usuario }) =>
			generalRequest(`${URL1}/${email}`, 'PUT', usuario),
		deleteUsuario: (_, { email }) =>
			generalRequest(`${URL1}/${email}`, 'DELETE'),
		//////////////
		createReserva: (_, { reserva }) =>
			generalRequest(`${URL2}`, 'POST', reserva),
		updateReserva: (_, { id, reserva }) =>
			generalRequest(`${URL2}/${id}`, 'PUT', reserva),
		deleteReserva: (_, { id }) =>
			generalRequest(`${URL2}/${id}`, 'DELETE'),
		///////////////	
		createRoute: (_,{ route }) =>
			generalRequest(`${URL3}`, 'POST', route),
		updateRoute: (_, { id, route }) =>
			generalRequest(`${URL3}/${id}`, 'PUT', route),
		deleteRoute: (_, { id }) =>
			generalRequest(`${URL3}/${id}`, 'DELETE'),
		////////////////
		createCountry: (_, { country_name }) =>
			generalRequest(`${URL4}/country`, 'POST', country_name)
	}
};

export default resolvers;
