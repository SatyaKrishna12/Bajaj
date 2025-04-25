import React from 'react';
import Card from './Card';

function AllDoctors({ doctors }) {
  if (doctors.length === 0) {
    return <p>No doctors found.</p>;
  }

  return (
    <>
      {doctors.map((doctor) => (
        <Card key={doctor.id} doctor={doctor} />
      ))}
    </>
  );
}

export default AllDoctors;