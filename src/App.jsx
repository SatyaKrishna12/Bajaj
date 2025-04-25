import React, { useEffect, useState, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import AllDoctors from './components/AllDoctors';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

const getUniqueSpecialties = (doctors) => {
  const specialtiesSet = new Set();
  doctors.forEach((doc) => {
    if (Array.isArray(doc.specialities)) {
      doc.specialities.forEach((spec) => specialtiesSet.add(spec.name));
    }
  });
  return Array.from(specialtiesSet).sort();
};

const parseQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get('search') || '',
    consultation: params.get('consultation') || '',
    specialties: params.get('specialties') ? params.get('specialties').split(',') : [],
    sort: params.get('sort') || '',
  };
};

const updateQueryParams = (filters) => {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.consultation) params.set('consultation', filters.consultation);
  if (filters.specialties.length > 0) params.set('specialties', filters.specialties.join(','));
  if (filters.sort) params.set('sort', filters.sort);
  const newUrl = window.location.pathname + '?' + params.toString();
  window.history.pushState(null, '', newUrl);
};

function App() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [consultation, setConsultation] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [sort, setSort] = useState('');
  const [uniqueSpecialties, setUniqueSpecialties] = useState([]);

  useEffect(() => {
    const { search, consultation, specialties, sort } = parseQueryParams();
    setSearch(search);
    setConsultation(consultation);
    setSpecialties(specialties);
    setSort(sort);
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setUniqueSpecialties(getUniqueSpecialties(data));
      });
  }, []);

  useEffect(() => {
    updateQueryParams({ search, consultation, specialties, sort });
  }, [search, consultation, specialties, sort]);

  useEffect(() => {
    const onPopState = () => {
      const { search, consultation, specialties, sort } = parseQueryParams();
      setSearch(search);
      setConsultation(consultation);
      setSpecialties(specialties);
      setSort(sort);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const filteredDoctors = useMemo(() => {
    let filtered = doctors;
    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(lowerSearch)
      );
    } else if (consultation) {
      if (consultation === 'Video Consult') {
        filtered = filtered.filter((doc) => doc.video_consult === true);
      } else if (consultation === 'In Clinic') {
        filtered = filtered.filter((doc) => doc.in_clinic === true);
      }
    } else if (specialties.length > 0) {
      filtered = filtered.filter((doc) => {
        if (!Array.isArray(doc.specialities)) return false;
        const docSpecialtyNames = doc.specialities.map((spec) => spec.name);
        return specialties.every((spec) => docSpecialtyNames.includes(spec));
      });
    }

    if (sort === 'fees') {
      filtered = filtered.slice().sort((a, b) => {
        const feeA = typeof a.fees === 'string' ? parseInt(a.fees.replace(/[^\d]/g, '')) : a.fees;
        const feeB = typeof b.fees === 'string' ? parseInt(b.fees.replace(/[^\d]/g, '')) : b.fees;
        return feeA - feeB;
      });
    } else if (sort === 'experience') {
      filtered = filtered.slice().sort((a, b) => {
        const expA = typeof a.experience === 'string' ? parseInt(a.experience) : a.experience;
        const expB = typeof b.experience === 'string' ? parseInt(b.experience) : b.experience;
        return expB - expA;
      });
    }

    return filtered;
  }, [doctors, search, consultation, specialties, sort]);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    const lowerSearch = search.toLowerCase();
    return doctors
      .filter((doc) => doc.name.toLowerCase().includes(lowerSearch))
      .slice(0, 3);
  }, [doctors, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSuggestionClick = (name) => {
    setSearch(name);
  };

  const handleConsultationChange = (e) => {
    setConsultation(e.target.value);
  };

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSpecialties((prev) => [...prev, value]);
    } else {
      setSpecialties((prev) => prev.filter((spec) => spec !== value));
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  console.log(doctors);

  return (
    <div className="app-container">
      <SearchBar
        search={search}
        onSearchChange={handleSearchChange}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />
      <div className="main-content">
        <div className="filter-panel">
          <FilterPanel
            consultation={consultation}
            onConsultationChange={handleConsultationChange}
            specialties={specialties}
            onSpecialtyChange={handleSpecialtyChange}
            sort={sort}
            onSortChange={handleSortChange}
            uniqueSpecialties={uniqueSpecialties}
          />
        </div>
        <div className="doctor-list">
          <AllDoctors doctors={filteredDoctors} />
        </div>
      </div>
    </div>
  );
}

export default App;