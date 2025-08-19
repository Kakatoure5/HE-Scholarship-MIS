import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, GlobeIcon, BookOpenIcon, CalendarIcon } from 'lucide-react';
// Mock scholarship data
const scholarships = [{
  id: '1',
  title: 'National Merit Scholarship',
  level: 'Undergraduate',
  field: 'All Fields',
  country: 'Domestic',
  deadline: '2023-12-31',
  funding: '$10,000 per year',
  description: 'Merit-based scholarship for outstanding undergraduate students with exceptional academic achievements.',
  eligibility: 'GPA 3.5+, Citizenship required',
  thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}, {
  id: '2',
  title: 'STEM Excellence Grant',
  level: 'Graduate',
  field: 'Science, Technology, Engineering, Mathematics',
  country: 'Domestic',
  deadline: '2023-11-15',
  funding: '$25,000 per year',
  description: 'Supporting graduate students pursuing advanced degrees in STEM fields with research potential.',
  eligibility: 'GPA 3.7+, Research proposal required',
  thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}, {
  id: '3',
  title: 'International Exchange Program',
  level: 'Undergraduate, Graduate',
  field: 'All Fields',
  country: 'International',
  deadline: '2024-01-15',
  funding: 'Full tuition and stipend',
  description: 'Study abroad opportunity for students interested in international education and cultural exchange.',
  eligibility: 'GPA 3.0+, Language proficiency required',
  thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}, {
  id: '4',
  title: 'Future Teachers Scholarship',
  level: 'Undergraduate',
  field: 'Education',
  country: 'Domestic',
  deadline: '2023-10-30',
  funding: '$15,000 per year',
  description: 'Supporting future educators committed to teaching in high-need areas after graduation.',
  eligibility: 'GPA 3.2+, Teaching commitment required',
  thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}, {
  id: '5',
  title: 'Healthcare Heroes Grant',
  level: 'Graduate',
  field: 'Medicine, Nursing, Public Health',
  country: 'Domestic',
  deadline: '2023-11-30',
  funding: '$30,000 per year',
  description: 'Supporting graduate students in healthcare fields committed to serving in underserved communities.',
  eligibility: 'GPA 3.5+, Community service required',
  thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}, {
  id: '6',
  title: 'Arts & Humanities Fellowship',
  level: 'Graduate',
  field: 'Arts, Humanities',
  country: 'Domestic, International',
  deadline: '2024-02-15',
  funding: '$20,000 per year',
  description: 'Supporting scholars and artists pursuing advanced degrees in arts and humanities disciplines.',
  eligibility: 'Portfolio or writing sample required',
  thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}];
export const ScholarshipDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: '',
    field: '',
    country: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  // Filter scholarships based on search term and filters
  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) || scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filters.level === '' || scholarship.level.includes(filters.level);
    const matchesField = filters.field === '' || scholarship.field.includes(filters.field);
    const matchesCountry = filters.country === '' || scholarship.country.includes(filters.country);
    return matchesSearch && matchesLevel && matchesField && matchesCountry;
  });
  const handleFilterChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  const clearFilters = () => {
    setFilters({
      level: '',
      field: '',
      country: ''
    });
    setSearchTerm('');
  };
  return <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Scholarship Directory</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Browse through available scholarships and find opportunities that
          match your educational goals.
        </p>
      </div>
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search scholarships by title or description..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon className="h-5 w-5 mr-2 text-gray-400" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        {showFilters && <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Education Level
                </label>
                <select id="level" name="level" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filters.level} onChange={e => handleFilterChange('level', e.target.value)}>
                  <option value="">All Levels</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Study
                </label>
                <select id="field" name="field" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filters.field} onChange={e => handleFilterChange('field', e.target.value)}>
                  <option value="">All Fields</option>
                  <option value="Science">Science</option>
                  <option value="Technology">Technology</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Arts">Arts</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select id="country" name="country" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={filters.country} onChange={e => handleFilterChange('country', e.target.value)}>
                  <option value="">All Countries</option>
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button type="button" className="text-sm text-blue-600 hover:text-blue-500" onClick={clearFilters}>
                Clear all filters
              </button>
            </div>
          </div>}
      </div>
      {/* Results Section */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-4">
          Showing {filteredScholarships.length} of {scholarships.length}{' '}
          scholarships
        </p>
        {filteredScholarships.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map(scholarship => <div key={scholarship.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="h-48 overflow-hidden">
                  <img src={scholarship.thumbnail} alt={scholarship.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link to={`/scholarships/${scholarship.id}`} className="text-blue-600 hover:text-blue-800">
                      {scholarship.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {scholarship.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <BookOpenIcon className="h-4 w-4 mr-1" />
                    <span>{scholarship.level}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <GlobeIcon className="h-4 w-4 mr-1" />
                    <span>{scholarship.country}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>
                      Deadline:{' '}
                      {new Date(scholarship.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-blue-600 mb-4">
                    Funding: {scholarship.funding}
                  </div>
                  <Link to={`/scholarships/${scholarship.id}`} className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    View Details
                  </Link>
                </div>
              </div>)}
          </div> : <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-gray-500 mb-4">
              No scholarships found matching your criteria.
            </div>
            <button className="text-blue-600 hover:text-blue-800 font-medium" onClick={clearFilters}>
              Clear filters and try again
            </button>
          </div>}
      </div>
    </div>;
};