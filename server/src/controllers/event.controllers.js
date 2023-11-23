import pool from "../db.js";

export const createEventByOrganizer = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autorización no proporcionado" });
  }

  const userId = req.userId;
  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND role='Organizer'",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Debe ser organizador para poder crear un evento." });
    } else {
      const {
        eventTitle,
        eventDescription,
        urlEvent,
        typeOfActivity,
        artistEvent,
        initialDate,
        finalDate,
        eventImage,
      } = req.body;

      try {
        const eventResult = await pool.query(
          `INSERT INTO events (organizer_id, eventTitle,eventDescription,urlEvent,typeOfActivity,artistEvent,initialDate,finalDate,eventImage) 
  VALUES ($1,$2,$3,$4,$5,$6, $7, $8, $9) 
  RETURNING id`,
          [
            userId,
            eventTitle,
            eventDescription,
            urlEvent,
            typeOfActivity,
            artistEvent,
            initialDate,
            finalDate,
            eventImage,
          ]
        );
        const eventId = eventResult.rows[0].id;

        await pool.query(
          `INSERT INTO event_by_artist (event_id, event_by_artist_id)
              SELECT $1, users.id
              FROM users
              WHERE users.username LIKE $2
              RETURNING *`,
          [eventId, artistEvent]
        );
        res.status(200).json({ message: "Evento creado." });
      } catch (error) {
        console.error("Error en la creación del evento:", error);
        res.status(500).json({ message: "Error interno del servidor." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
};

export const editEventByOrganizer = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autorización no proporcionado" });
  }

  const userId = req.userId;
  const eventId = req.params.eventId;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND role='Organizer'",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Debe ser organizador para poder crear un evento." });
    } else {
      const {
        eventId,
        eventTitle,
        eventDescription,
        urlEvent,
        typeOfActivity,
        artistEvent,
        initialDate,
        finalDate,
        eventImage,
      } = req.body;

      let query = `INSERT INTO events (id,organizer_id, eventTitle,eventDescription,urlEvent,typeOfActivity,artistEvent,initialDate,finalDate,eventImage) 
  VALUES ($1,$2,$3,$4,$5,$6, $7, $8, $9, $10) 
  ON CONFLICT (id) DO UPDATE 
  SET  
  eventTitle=EXCLUDED.eventTitle, 
  eventDescription=EXCLUDED.eventDescription,
  urlEvent=EXCLUDED.urlEvent, 
  typeOfActivity=EXCLUDED.typeOfActivity, 
  artistEvent=EXCLUDED.artistEvent, 
  initialDate=EXCLUDED.initialDate, 
  finalDate=EXCLUDED.finalDate, 
  eventImage=EXCLUDED.eventImage
  RETURNING *`;

      try {
        const { rows } = await pool.query(query, [
          eventId,
          userId,
          eventTitle,
          eventDescription,
          urlEvent,
          typeOfActivity,
          artistEvent,
          initialDate,
          finalDate,
          eventImage,
        ]);

        res.status(200).json({ message: "Evento editado exitosamente." });
        await pool.query(
          `INSERT INTO event_by_artist (event_id, event_by_artist_id)
            SELECT $1, users.id
            FROM users
            WHERE users.username LIKE $2
            RETURNING *`,
          [eventId, artistEvent]
        );
      } catch (error) {
        console.error("Error en la edición del evento:", error);
        res.status(500).json({ message: "Error interno del servidor." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
};

export const getEventByOrganizer = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      "SELECT * FROM events INNER JOIN organizer ON id_user = organizer_id WHERE organizer_id = $1;",
      [userId]
    );

    if (result.rows && result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron eventos para el organizador" });
    }
  } catch (error) {
    console.log("Error query insert : ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token de autorización no proporcionado" });
    }

    const userId = req.userId;
    const eventId = req.params.eventId;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND role='Organizer'",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        message: "Debe ser organizador para poder editar un evento.",
      });
    } else {
      const response = await pool.query("SELECT * FROM events WHERE id = $1", [
        eventId,
      ]);

      res.status(200).json(response.rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
};

export const getEventByArtist = async (req, res) => {
  const userId = req.userId;
  const result = await pool.query(
    "SELECT * FROM event_by_artist INNER JOIN artists  on artists.id= event_by_artist.event_by_artist_id INNER JOIN events  on events.id = event_by_artist.event_id WHERE event_by_artist_id = $1",
    [userId]
  );
  try {
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error query insert : ", error);
    res.status(500).json(error.detail);
    return res.sendStatus(403);
  }
};

export const getAllEvents = async (req, res) => {
  const result = await pool.query("SELECT * FROM events");
  try {
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error query insert : ", error);
    res.status(500).json(error.detail);
    return res.sendStatus(403);
  }
};

export const filterEventByString = async (req, res) => {
  try {
    const filterString = req.params.filterString;

    const response = await pool.query(
      "SELECT * FROM events WHERE events.eventtitle LIKE $1 OR events.eventdescription LIKE $1",
      [`%${filterString}%`]
    );

    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
};

export const deleteEventByOrganizer = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autorización no proporcionado" });
  }
  const userId = req.userId;
  const eventIdToDelete = req.params.eventId;

  try {
    const eventResult = await pool.query(
      "SELECT * FROM event_by_artist WHERE event_id = $1",
      [eventIdToDelete]
    );

    if (eventResult.rows.length === 0) {
      return res.status(401).json({ message: "El evento no existe." });
    } else {
      try {
        const userResult = await pool.query(
          "SELECT * FROM users WHERE id = $1 AND role='Organizer'",
          [userId]
        );

        if (userResult.rows.length === 0) {
          return res.status(401).json({
            message: "Debe ser organizador para poder eliminar un evento.",
          });
        } else {
          await pool.query("DELETE FROM event_by_artist WHERE event_id = $1", [
            eventIdToDelete,
          ]);
          await pool.query("DELETE FROM events WHERE id = $1", [
            eventIdToDelete,
          ]);

          res.json(`Event ${eventIdToDelete} eliminado exitosamente.`);
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Error de servidor");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
};
