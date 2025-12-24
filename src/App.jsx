import React, { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const App = () => {
  const [threshold, setThreshold] = useState(20000);
  const [chartType, setChartType] = useState('grouped-bar');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('population');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedState, setSelectedState] = useState('both');

  // Complete city data with populations from 2020 Census
  const allCities = {
    wisconsin: [
      { name: 'Milwaukee', population: 577222, type: 'core', metro: 'Milwaukee' },
      { name: 'Madison', population: 269840, type: 'core', metro: 'Madison' },
      { name: 'Green Bay', population: 107395, type: 'independent', metro: null },
      { name: 'Kenosha', population: 99986, type: 'metro', metro: 'Milwaukee' },
      { name: 'Racine', population: 77816, type: 'metro', metro: 'Milwaukee' },
      { name: 'Appleton', population: 75644, type: 'independent', metro: null },
      { name: 'Waukesha', population: 71158, type: 'metro', metro: 'Milwaukee' },
      { name: 'Eau Claire', population: 69421, type: 'independent', metro: null },
      { name: 'Oshkosh', population: 66816, type: 'independent', metro: null },
      { name: 'Janesville', population: 65615, type: 'independent', metro: null },
      { name: 'West Allis', population: 60325, type: 'metro', metro: 'Milwaukee' },
      { name: 'La Crosse', population: 52680, type: 'independent', metro: null },
      { name: 'Sheboygan', population: 49929, type: 'independent', metro: null },
      { name: 'Wauwatosa', population: 48387, type: 'metro', metro: 'Milwaukee' },
      { name: 'Fond du Lac', population: 44678, type: 'independent', metro: null },
      { name: 'Brookfield', population: 41464, type: 'metro', metro: 'Milwaukee' },
      { name: 'New Berlin', population: 40451, type: 'metro', metro: 'Milwaukee' },
      { name: 'Wausau', population: 39994, type: 'independent', metro: null },
      { name: 'Menomonee Falls', population: 38527, type: 'metro', metro: 'Milwaukee' },
      { name: 'Greenfield', population: 37803, type: 'metro', metro: 'Milwaukee' },
      { name: 'Franklin', population: 36816, type: 'metro', metro: 'Milwaukee' },
      { name: 'Beloit', population: 36657, type: 'independent', metro: null },
      { name: 'Oak Creek', population: 36497, type: 'metro', metro: 'Milwaukee' },
      { name: 'Sun Prairie', population: 35967, type: 'metro', metro: 'Madison' },
      { name: 'Manitowoc', population: 34626, type: 'independent', metro: null },
      { name: 'West Bend', population: 31752, type: 'independent', metro: null },
      { name: 'Fitchburg', population: 29609, type: 'metro', metro: 'Madison' },
      { name: 'Mount Pleasant', population: 27732, type: 'metro', metro: 'Milwaukee' },
      { name: 'Neenah', population: 27319, type: 'independent', metro: null },
      { name: 'Superior', population: 26751, type: 'independent', metro: null },
      { name: 'Stevens Point', population: 25666, type: 'independent', metro: null },
      { name: 'De Pere', population: 25410, type: 'independent', metro: null },
      { name: 'Caledonia', population: 25361, type: 'metro', metro: 'Milwaukee' },
      { name: 'Mequon', population: 25142, type: 'metro', metro: 'Milwaukee' },
      { name: 'Muskego', population: 25032, type: 'metro', metro: 'Milwaukee' },
      { name: 'Watertown', population: 22926, type: 'independent', metro: null },
      { name: 'Middleton', population: 21827, type: 'metro', metro: 'Madison' },
      { name: 'Pleasant Prairie', population: 21250, type: 'metro', metro: 'Milwaukee' },
      { name: 'Germantown', population: 20917, type: 'metro', metro: 'Milwaukee' },
      { name: 'South Milwaukee', population: 20795, type: 'metro', metro: 'Milwaukee' }
    ],
    minnesota: [
      { name: 'Minneapolis', population: 429954, type: 'core', metro: 'Twin Cities' },
      { name: 'St. Paul', population: 311527, type: 'core', metro: 'Twin Cities' },
      { name: 'Rochester', population: 121395, type: 'independent', metro: null },
      { name: 'Bloomington', population: 89987, type: 'metro', metro: 'Twin Cities' },
      { name: 'Duluth', population: 86697, type: 'independent', metro: null },
      { name: 'Brooklyn Park', population: 86478, type: 'metro', metro: 'Twin Cities' },
      { name: 'Plymouth', population: 81026, type: 'metro', metro: 'Twin Cities' },
      { name: 'Woodbury', population: 75102, type: 'metro', metro: 'Twin Cities' },
      { name: 'Blaine', population: 70222, type: 'metro', metro: 'Twin Cities' },
      { name: 'Lakeville', population: 69490, type: 'metro', metro: 'Twin Cities' },
      { name: 'St. Cloud', population: 68881, type: 'independent', metro: null },
      { name: 'Eagan', population: 68855, type: 'metro', metro: 'Twin Cities' },
      { name: 'Burnsville', population: 64317, type: 'metro', metro: 'Twin Cities' },
      { name: 'Eden Prairie', population: 64198, type: 'metro', metro: 'Twin Cities' },
      { name: 'Coon Rapids', population: 63599, type: 'metro', metro: 'Twin Cities' },
      { name: 'Apple Valley', population: 56374, type: 'metro', metro: 'Twin Cities' },
      { name: 'Minnetonka', population: 53781, type: 'metro', metro: 'Twin Cities' },
      { name: 'Edina', population: 53494, type: 'metro', metro: 'Twin Cities' },
      { name: 'St. Louis Park', population: 50010, type: 'metro', metro: 'Twin Cities' },
      { name: 'Moorhead', population: 44505, type: 'independent', metro: null },
      { name: 'Mankato', population: 44488, type: 'independent', metro: null },
      { name: 'Shakopee', population: 43698, type: 'metro', metro: 'Twin Cities' },
      { name: 'Maplewood', population: 42088, type: 'metro', metro: 'Twin Cities' },
      { name: 'Cottage Grove', population: 38839, type: 'metro', metro: 'Twin Cities' },
      { name: 'Richfield', population: 36994, type: 'metro', metro: 'Twin Cities' },
      { name: 'Roseville', population: 36254, type: 'metro', metro: 'Twin Cities' },
      { name: 'Inver Grove Heights', population: 35801, type: 'metro', metro: 'Twin Cities' },
      { name: 'Brooklyn Center', population: 33782, type: 'metro', metro: 'Twin Cities' },
      { name: 'Andover', population: 32601, type: 'metro', metro: 'Twin Cities' },
      { name: 'Savage', population: 32465, type: 'metro', metro: 'Twin Cities' },
      { name: 'Fridley', population: 29590, type: 'metro', metro: 'Twin Cities' },
      { name: 'Oakdale', population: 28303, type: 'metro', metro: 'Twin Cities' },
      { name: 'Ramsey', population: 27646, type: 'metro', metro: 'Twin Cities' },
      { name: 'Prior Lake', population: 27617, type: 'metro', metro: 'Twin Cities' },
      { name: 'Chaska', population: 27810, type: 'metro', metro: 'Twin Cities' },
      { name: 'Owatonna', population: 26420, type: 'independent', metro: null },
      { name: 'Austin', population: 26174, type: 'independent', metro: null },
      { name: 'Winona', population: 25948, type: 'independent', metro: null },
      { name: 'Chanhassen', population: 25947, type: 'metro', metro: 'Twin Cities' },
      { name: 'Rosemount', population: 25650, type: 'metro', metro: 'Twin Cities' },
      { name: 'Shoreview', population: 26921, type: 'metro', metro: 'Twin Cities' },
      { name: 'White Bear Lake', population: 24883, type: 'metro', metro: 'Twin Cities' },
      { name: 'Faribault', population: 24453, type: 'independent', metro: null },
      { name: 'Farmington', population: 23632, type: 'metro', metro: 'Twin Cities' },
      { name: 'Champlin', population: 23919, type: 'metro', metro: 'Twin Cities' },
      { name: 'New Brighton', population: 23454, type: 'metro', metro: 'Twin Cities' },
      { name: 'Crystal', population: 23330, type: 'metro', metro: 'Twin Cities' },
      { name: 'Golden Valley', population: 22552, type: 'metro', metro: 'Twin Cities' },
      { name: 'Hastings', population: 22154, type: 'metro', metro: 'Twin Cities' },
      { name: 'Columbia Heights', population: 21973, type: 'metro', metro: 'Twin Cities' },
      { name: 'New Hope', population: 21986, type: 'metro', metro: 'Twin Cities' },
      { name: 'Willmar', population: 21015, type: 'independent', metro: null },
      { name: 'Lino Lakes', population: 21399, type: 'metro', metro: 'Twin Cities' },
      { name: 'West St. Paul', population: 20615, type: 'metro', metro: 'Twin Cities' },
      { name: 'Northfield', population: 20790, type: 'metro', metro: 'Twin Cities' },
      { name: 'South St. Paul', population: 20759, type: 'metro', metro: 'Twin Cities' },
      { name: 'Forest Lake', population: 20611, type: 'metro', metro: 'Twin Cities' }
    ]
  };

  // Filter and sort cities
  const filteredCities = useMemo(() => {
    let cities = [];

    if (selectedState === 'both' || selectedState === 'wisconsin') {
      cities = [...cities, ...allCities.wisconsin.map(c => ({ ...c, state: 'Wisconsin' }))];
    }
    if (selectedState === 'both' || selectedState === 'minnesota') {
      cities = [...cities, ...allCities.minnesota.map(c => ({ ...c, state: 'Minnesota' }))];
    }

    cities = cities.filter(c => c.population >= threshold);

    if (searchTerm) {
      cities = cities.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    cities.sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];

      if (sortColumn === 'type') {
        aVal = a.metro ? `${a.metro} - ${a.type}` : a.type;
        bVal = b.metro ? `${b.metro} - ${b.type}` : b.type;
      }

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return cities;
  }, [threshold, searchTerm, sortColumn, sortDirection, selectedState]);

  const aggregateData = useMemo(() => {
    const wiCities = allCities.wisconsin.filter(c => c.population >= threshold);
    const mnCities = allCities.minnesota.filter(c => c.population >= threshold);

    return {
      wisconsin: {
        total: wiCities.length,
        metro: wiCities.filter(c => c.type === 'metro' || c.type === 'core').length,
        independent: wiCities.filter(c => c.type === 'independent').length
      },
      minnesota: {
        total: mnCities.length,
        metro: mnCities.filter(c => c.type === 'metro' || c.type === 'core').length,
        independent: mnCities.filter(c => c.type === 'independent').length
      }
    };
  }, [threshold]);

  const groupedBarData = [
    {
      name: 'Wisconsin',
      'Metro Suburban': aggregateData.wisconsin.metro,
      'Independent': aggregateData.wisconsin.independent,
    },
    {
      name: 'Minnesota',
      'Metro Suburban': aggregateData.minnesota.metro,
      'Independent': aggregateData.minnesota.independent,
    }
  ];

  const wiPieData = [
    { name: 'Metro Suburban', value: aggregateData.wisconsin.metro, color: '#3b82f6' },
    { name: 'Independent', value: aggregateData.wisconsin.independent, color: '#10b981' }
  ];

  const mnPieData = [
    { name: 'Metro Suburban', value: aggregateData.minnesota.metro, color: '#3b82f6' },
    { name: 'Independent', value: aggregateData.minnesota.independent, color: '#10b981' }
  ];

  const topCitiesData = useMemo(() => {
    const wi = allCities.wisconsin.filter(c => c.population >= threshold).slice(0, 10);
    const mn = allCities.minnesota.filter(c => c.population >= threshold).slice(0, 10);

    return wi.map((city, idx) => ({
      name: `#${idx + 1}`,
      'WI': city.population,
      'WI City': city.name,
      'MN': mn[idx]?.population || 0,
      'MN City': mn[idx]?.name || ''
    }));
  }, [threshold]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const renderChart = () => {
    switch(chartType) {
      case 'grouped-bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={groupedBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Metro Suburban" fill="#3b82f6" />
              <Bar dataKey="Independent" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'city-comparison':
        return (
          <div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topCitiesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                          <p className="font-semibold mb-1">{payload[0]?.payload.name}</p>
                          <p className="text-red-600">WI: {payload[0]?.payload['WI City']} - {payload[0]?.value?.toLocaleString()}</p>
                          <p className="text-blue-600">MN: {payload[0]?.payload['MN City']} - {payload[1]?.value?.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="WI" fill="#dc2626" name="Wisconsin" />
                <Bar dataKey="MN" fill="#2563eb" name="Minnesota" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Wisconsin Top 10</h3>
                <div className="space-y-1 text-sm">
                  {topCitiesData.map((city, idx) => (
                    <div key={idx} className="flex justify-between bg-red-50 p-2 rounded">
                      <span className="font-medium">{idx + 1}. {city['WI City']}</span>
                      <span className="text-gray-600">{city['WI'].toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Minnesota Top 10</h3>
                <div className="space-y-1 text-sm">
                  {topCitiesData.map((city, idx) => (
                    <div key={idx} className="flex justify-between bg-blue-50 p-2 rounded">
                      <span className="font-medium">{idx + 1}. {city['MN City']}</span>
                      <span className="text-gray-600">{city['MN'].toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'pie':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-center font-semibold mb-2">Wisconsin</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie data={wiPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {wiPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-center font-semibold mb-2">Minnesota</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie data={mnPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {mnPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Wisconsin vs Minnesota City Distribution</h1>
        <p className="text-gray-600">Interactive city-level data with full drill-down capabilities</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Population Threshold:</label>
            <div className="flex gap-2 flex-wrap">
              {[20000, 30000, 40000, 50000].map(t => (
                <button
                  key={t}
                  onClick={() => setThreshold(t)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    threshold === t
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {(t/1000).toFixed(0)}k+
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">View Type:</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'grouped-bar', name: 'Summary' },
                { id: 'city-comparison', name: 'Top 10' },
                { id: 'pie', name: 'Breakdown' },
                { id: 'data-table', name: 'All Cities' }
              ].map(chart => (
                <button
                  key={chart.id}
                  onClick={() => setChartType(chart.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    chartType === chart.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {chart.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-red-50 border-l-4 border-red-600 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-red-900 mb-4">Wisconsin</h2>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-red-700">{aggregateData.wisconsin.total} cities</p>
            <p className="text-gray-700"><span className="font-semibold">{aggregateData.wisconsin.metro}</span> Metro ({((aggregateData.wisconsin.metro / aggregateData.wisconsin.total) * 100).toFixed(1)}%)</p>
            <p className="text-gray-700"><span className="font-semibold">{aggregateData.wisconsin.independent}</span> Independent ({((aggregateData.wisconsin.independent / aggregateData.wisconsin.total) * 100).toFixed(1)}%)</p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Minnesota</h2>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-blue-700">{aggregateData.minnesota.total} cities</p>
            <p className="text-gray-700"><span className="font-semibold">{aggregateData.minnesota.metro}</span> Metro ({((aggregateData.minnesota.metro / aggregateData.minnesota.total) * 100).toFixed(1)}%)</p>
            <p className="text-gray-700"><span className="font-semibold">{aggregateData.minnesota.independent}</span> Independent ({((aggregateData.minnesota.independent / aggregateData.minnesota.total) * 100).toFixed(1)}%)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {chartType !== 'data-table' ? (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {chartType === 'grouped-bar' && 'Distribution Summary'}
              {chartType === 'city-comparison' && 'Top 10 Cities Head-to-Head'}
              {chartType === 'pie' && 'Metro vs Independent Breakdown'}
            </h2>
            {renderChart()}
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h2 className="text-xl font-bold text-gray-800">Complete City Data</h2>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg flex-1 md:w-64"
                />
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="both">Both States</option>
                  <option value="wisconsin">Wisconsin Only</option>
                  <option value="minnesota">Minnesota Only</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th
                      className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSort('name')}
                    >
                      City {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSort('state')}
                    >
                      State {sortColumn === 'state' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-4 py-3 text-right font-semibold cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSort('population')}
                    >
                      Population {sortColumn === 'population' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSort('type')}
                    >
                      Type {sortColumn === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Metro Area</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCities.map((city, idx) => (
                    <tr
                      key={`${city.state}-${city.name}`}
                      className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="px-4 py-3 font-medium">{city.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          city.state === 'Wisconsin'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {city.state}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">{city.population.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          city.type === 'core'
                            ? 'bg-purple-100 text-purple-800'
                            : city.type === 'metro'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {city.type === 'core' ? 'Core City' : city.type === 'metro' ? 'Metro Suburb' : 'Independent'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{city.metro || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCities.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No cities found matching your criteria
                </div>
              )}

              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredCities.length} cities over {threshold.toLocaleString()} population
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
