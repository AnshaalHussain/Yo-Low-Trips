module.exports = (db) => {
  // Get a single user from database given their id
  const getUsers = (id) => {
    const query = {
      text: `SELECT * FROM users WHERE id = $1`,
    };

    return db
      .query(query, [id])
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // Get a single user from database given their email
  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };

    return db
      .query(query, [email])
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // Add user to database
  const addUser = (firstName, lastName, email, password) => {
    const query = {
      text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [firstName, lastName, email, password],
    };

    return db
      .query(query, [firstName, lastName, email, password])
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getAllFavouritesForUser = (userId) => {
    const query = {
      text: `SELECT * FROM favourites
      JOIN users ON users.id = favourites.user_id
      JOIN flights ON flights.id = favourites.flight_id
      WHERE favourites.user_id = $1`
      
    //   `SELECT * FROM flights
    //         JOIN favourites ON flights.flight_id = favourites.flight_id
    //         WHERE favourites.user_id = $1
    //         `
      //     text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
      // FROM users
      // INNER JOIN posts
      // ON users.id = posts.user_id`
    };

    return db
      .query(query, [userId])
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getCityForOrigin = (id) => {
    const query = {
      text: `SELECT name
            FROM cities
            WHERE id = $1`,
    };
    return db
      .query(query, [id])
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getFlights = () => {
    const query = {
      text: `SELECT *
            FROM flights`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    getUserByEmail,
    addUser,
    getAllFavouritesForUser,
    getCityForOrigin,
    getFlights,
  };
};
