import React from 'react';
import '../styles/DoctorCard.css'; 
function Card({ doctor }) {
  return (
    <div className="doctor-card" data-testid="doctor-card">
      <div className="doctor-card-row">
        <div className="doctor-photo-container">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="doctor-photo"
          />
        </div>
        <div className="doctor-info">
          <div className="doctor-card-body">
            <h5 className="doctor-name" data-testid="doctor-name">
              {doctor.name}
            </h5>
            <p className="doctor-specialty" data-testid="doctor-specialty">
              {Array.isArray(doctor.speciality) ? doctor.speciality.join(', ') : ''}
            </p>
            <p className="doctor-experience" data-testid="doctor-experience">
              {doctor.experience} yrs exp.
            </p>
          </div>
        </div>
        <div className="doctor-fee-booking">
          <div className="doctor-fee" data-testid="doctor-fee">
            {doctor.fees}
          </div>
          <button className="book-appointment-btn">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;