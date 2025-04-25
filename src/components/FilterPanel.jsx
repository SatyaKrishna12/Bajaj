import React from 'react';
import '../styles/FilterPanel.css'; 

function FilterPanel({
  consultation,
  onConsultationChange,
  specialties,
  onSpecialtyChange,
  sort,
  onSortChange,
  uniqueSpecialties,
}) {
  return (
    <div>
      <div className="filter-section">
        <h5 data-testid="filter-header-moc">Consultation Mode</h5>
        <div className="filter-option">
          <input
            className="filter-radio-input"
            type="radio"
            name="consultation"
            id="videoConsult"
            value="Video Consult"
            checked={consultation === 'Video Consult'}
            onChange={onConsultationChange}
            data-testid="filter-video-consult"
          />
          <label className="filter-radio-label" htmlFor="videoConsult">
            Video Consult
          </label>
        </div>
        <div className="filter-option">
          <input
            className="filter-radio-input"
            type="radio"
            name="consultation"
            id="inClinic"
            value="In Clinic"
            checked={consultation === 'In Clinic'}
            onChange={onConsultationChange}
            data-testid="filter-in-clinic"
          />
          <label className="filter-radio-label" htmlFor="inClinic">
            In Clinic
          </label>
        </div>
      </div>

      <div className="filter-section" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <h5 data-testid="filter-header-speciality">Specialities</h5>
        {uniqueSpecialties.map((spec) => {
          const testId = `filter-specialty-${spec.replace(/\s+/g, '-').replace(/\//g, '-')}`;
          return (
            <div className="filter-option" key={spec}>
              <input
                className="filter-checkbox-input"
                type="checkbox"
                id={`spec-${spec}`}
                value={spec}
                checked={specialties.includes(spec)}
                onChange={onSpecialtyChange}
                data-testid={testId}
              />
              <label className="filter-checkbox-label" htmlFor={`spec-${spec}`}>
                {spec}
              </label>
            </div>
          );
        })}
      </div>

      <div className="filter-section">
        <h5 data-testid="filter-header-sort">Sort by</h5>
        <div className="filter-option">
          <input
            className="filter-radio-input"
            type="radio"
            name="sort"
            id="sortFees"
            value="fees"
            checked={sort === 'fees'}
            onChange={onSortChange}
            data-testid="sort-fees"
          />
          <label className="filter-radio-label" htmlFor="sortFees">
            Price: Low-High
          </label>
        </div>
        <div className="filter-option">
          <input
            className="filter-radio-input"
            type="radio"
            name="sort"
            id="sortExperience"
            value="experience"
            checked={sort === 'experience'}
            onChange={onSortChange}
            data-testid="sort-experience"
          />
          <label className="filter-radio-label" htmlFor="sortExperience">
            Experience: Most Experience first
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;