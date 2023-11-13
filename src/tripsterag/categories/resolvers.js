import { generalRequest, getRequest } from '../../utilities';
import { serverConfigurations } from './server';
import ldap from 'ldapjs';
import { isAuthenticated } from './auth';

const selectedConfig1 = serverConfigurations.config1;
const URL1 = `http://${selectedConfig1.url}:${selectedConfig1.port}/${selectedConfig1.entryPoint}`;

const selectedConfig2 = serverConfigurations.config2;
const URL2 = `http://${selectedConfig2.url}:${selectedConfig2.port}/${selectedConfig2.entryPoint}`;

const selectedConfig3 = serverConfigurations.config3;
const URL3 = `http://${selectedConfig3.url}:${selectedConfig3.port}/${selectedConfig3.entryPoint}`;

const selectedConfig4 = serverConfigurations.config4;
const URL4 = `http://${selectedConfig4.url}:${selectedConfig4.port}/${selectedConfig4.entryPoint}`;

const selectedConfig5 = serverConfigurations.config5;
const URL5 = `http://${selectedConfig5.url}:${selectedConfig5.port}/${selectedConfig5.entryPoint}`;

// LDAP server configuration
const ldapServer = 'ldap://host.docker.internal:389';
const ldapBaseDN = 'ou=sa,dc=tripster,dc=unal,dc=edu,dc=co';

const ldapClient = ldap.createClient({
	url: ldapServer,
});

const authenticateWithLDAP = (email, password) => {
	return new Promise((resolve, reject) => {
		ldapClient.bind(`cn=${email},${ldapBaseDN}`, password, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

//Validación del token
const validateTokenAndProceed = async (token, requestedFunction) => {
	const isValidToken = await isAuthenticated(token);
	if (isValidToken) {
		return requestedFunction();
	} else {
		throw new Error("Token no válido. Operación no permitida");
	}
}



const resolvers = {
	Query: {
		allUsers: async (_, __, context) => {
			return validateTokenAndProceed(context.token, () => getRequest(URL1, ''));
		},
		usuarioByNombre: async (_, { nombre }, context) => {
			return validateTokenAndProceed(context.token, () => generalRequest(`${URL1}/${nombre}`, 'GET'));
		},
		//////////////
		reservaById: async (_, { id }, context) => {
			return validateTokenAndProceed(context.token, () => generalRequest(`${URL2}/${id}`, 'GET'));
		},
		allBookings: (_, __, context) => {
			return validateTokenAndProceed(context.token, () => getRequest(URL2, ''));
		},
		///////////////
		getRoutes: async (_, __, context) => {
			return validateTokenAndProceed(context.token, () => getRequest(URL3, ''));
		},
		getRoute: async (_, { id }, context) => {
			return validateTokenAndProceed(context.token, () => generalRequest(`${URL3}/${id}`, 'GET'));
		},
		///////////////
		getFlights: async (_, __, context) => {
			return validateTokenAndProceed(context.token, () => getRequest(`${URL4}/flights`, ''));
		},
		FlightByOrigDest: (_, parameters, context) => {
			return validateTokenAndProceed(context.token, () => generalRequest(`${URL4}/flight`, 'GET', parameters));
		},
	},
	Mutation: {
		createUsuario: (_, { usuario }) =>
			generalRequest(`${URL1}`, 'POST', usuario),
		updateUsuario: async (_, { email, usuario }) =>
			generalRequest(`${URL1}/${email}`, 'PUT', usuario),
		deleteUsuario: (_, { email }) =>
			generalRequest(`${URL1}/${email}`, 'DELETE'),
		//////////////
		createReserva: async (_, { reserva }, context) => {
			return validateTokenAndProceed(context.token, () => generalRequest(`${URL2}`, 'POST', reserva));
		},
		updateReserva: async (_, { id, reserva }, context) => {
			return validateTokenAndProceed(context.token, () => generalRequest(`${URL2}/${id}`, 'PUT', reserva));
		},
		deleteReserva: (_, { id }, context) => {
			return validateTokenAndProceed(context.token, () => generalRequest(`${URL2}/${id}`, 'DELETE'));
		},
		///////////////	
		createRoute: (_, { route }) =>
			generalRequest(`${URL3}`, 'POST', route),
		updateRoute: (_, { id, route }) =>
			generalRequest(`${URL3}/${id}`, 'PUT', route),
		deleteRoute: (_, { id }) =>
			generalRequest(`${URL3}/${id}`, 'DELETE'),
		////////////////
		createCountry: (_, { country_name }) =>
			generalRequest(`${URL4}/country`, 'POST', country_name),
		/////////////////
		getLogin: async (_, { login }) => {
			// Authenticate the user before allowing the mutation
			await authenticateWithLDAP(login.email, login.clave);
			return generalRequest(`${URL5}/login`, 'POST', _, login)
		}
	}
};

export default resolvers;
