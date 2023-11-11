export const usuarioTypeDef = `
  type Usuario {
      email: String!
      nombre: String!
      apellido: String!
      direccion: String!
      clave: String!
      telefono: String!
      birthday: String!
      rol: String!

  }
  input UsuarioInput {
      email: String!
      nombre: String!
      apellido: String!
      direccion: String!
      clave: String!
      telefono: String!
      birthday: String!
      rol: String!
  }`;

export const usuarioQueries = `
      allUsers: [Usuario]!
      usuarioByNombre(nombre: String!): Usuario!
  `;

export const usuarioMutations = `
    createUsuario(usuario: UsuarioInput!): Usuario!
    updateUsuario(email: String!, usuario: UsuarioInput!): Usuario!
    deleteUsuario(email: String!): String
`;
export const loginTypeDef =`
  type AuthTokenResponse  {
    token: String
    msg: String
  }
  input LoginInput {
    email: String!
    clave: String!
  }
`;
export const loginMutations = `
  getLogin(login:LoginInput!): AuthTokenResponse!
`;
export const reservaTypeDef = `
  type Reserva{
    id: ID
    booking_id: Int
    booking_flight_id: Int
    booking_user_id: Int
    booking_date: String
    booking_time: String
    booking_state: String
    booking_price: Int
  }
  input ReservaInput {
    booking_id:Int!
    booking_flight_id: Int!
    booking_user_id: Int!
    booking_date: String!
    booking_time: String!
    booking_state: String!
    booking_price: Int!
}
`;

export const reservaQueries = `
    allBookings: [Reserva]
    reservaById(id: ID!): Reserva!
`;

export const reservaMutations = `
    createReserva(reserva:ReservaInput!): Reserva!
    updateReserva(id:ID!,reserva : ReservaInput!):Reserva!
    deleteReserva(id:ID!): String
  `;

export const routeTypeDef = `
  type Route {
    ID: ID
    origin: String
    destiny: String
    numNodes: Int
    ordering: String
  }

  input RouteInput {
    origin: String!
    destiny: String!
  }
`;

export const routeQueries = `
    getRoutes: [Route]
    getRoute(id: ID!): Route
`;

export const routeMutations = `
    createRoute(route: RouteInput!): Route!
    updateRoute(id: ID!, route: RouteInput!): Route!
    deleteRoute(id: ID!): String
`;

export const flightTypeDef = `
  type Flight_Escala{
    airport_name:String!
  }

  type Flight_Airport_origin{
    _id:ID
    airport_origin_name:String!
  }
  
  type Flight_Airport_destination{
    _id:ID
    airport_destino_name:String!
  }

  type Flight {
    airport_origin:Flight_Airport_origin!
    airport_destination:Flight_Airport_destination!
    flight_airline:String!
    flight_seat_class:String!
    flight_escalas:[Flight_Escala]
    flight_available_seats:Int!
    flight_ticket_price:Float!

  }

  type CountryCreatedResponse{
    country_name:String
    message:String
  }

  input FlightSetCountry {
    country_name:String!
  }
  input getFlight {
      origin:String!
      destination:String!
  }`;
  export const flightQueries = `
      getFlights: [Flight]
      FlightByOrigDest(origin:String!,destination:String!): [Flight]
  `;
  export const countryMutations = `
  createCountry(country_name: FlightSetCountry!): CountryCreatedResponse!
`;