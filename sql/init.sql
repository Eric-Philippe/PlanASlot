CREATE TABLE IF NOT EXISTS Events (
   Id_Event VARCHAR(28),
   name VARCHAR(100) NOT NULL,
   startDatetime TIMESTAMP NOT NULL,
   endDatetime TIMESTAMP NOT NULL,
   PRIMARY KEY(Id_Event)
);

CREATE TABLE IF NOT EXISTS Registrations (
   Id_Registration SERIAL,
   email VARCHAR(320) NOT NULL,
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   registerDatetime TIMESTAMP NOT NULL,
   PRIMARY KEY(Id_Registration)
);

CREATE TABLE IF NOT EXISTS Slots (
   Id_Booking SERIAL,
   startDatetime TIMESTAMP NOT NULL,
   endDatetime TIMESTAMP NOT NULL,
   Id_Event VARCHAR(28) NOT NULL,
   Id_Registration INTEGER,
   PRIMARY KEY(Id_Booking),
   FOREIGN KEY (Id_Event) REFERENCES Events(Id_Event),
   FOREIGN KEY (Id_Registration) REFERENCES Registrations(Id_Registration)
);

CREATE VIEW IF NOT EXISTS view_event_registrations AS
SELECT
    e.Id_Event,
    e.startDatetime,
    e.endDatetime,
    r.Id_Registration,
    r.email,
    r.firstname,
    r.lastname,
    r.registerDatetime,
    s.Id_Booking,
    s.startDatetime as slotStartDatetime,
    s.endDatetime as slotEndDatetime
FROM Events e
JOIN Slots s ON e.Id_Event = s.Id_Event
JOIN Registrations r ON s.Id_Registration = r.Id_Registration