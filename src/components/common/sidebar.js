import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = ({ onSearch, minYear, maxYear }) => {
    const [stage, setStage] = useState('');
    const [sex, setSex] = useState('');
    const [yearFrom, setYearFrom] = useState('');
    const [yearTo, setYearTo] = useState('');
    const [captive, setCaptive] = useState('');
    const [lifeStage, setLifeStage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ stage, sex, yearFrom, yearTo, captive, lifeStage });
    };

    const yearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

    const lifeStageOptions = [
        'Egg', 'Larva', 'Nymph', 'Teneral', 'Juvenile',
        'Subimago', 'Subadult', 'Pupa', 'Adult', 'Mixed', 'Unknown'
    ];

    return (
        <div className="sidebar">
            <div className="search-form">
                <h4 className="sb-title">Advanced Search</h4>
                <form className="form-style-1" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 form-it">
                            <label>Moulting Stage</label>
                            <select value={stage} onChange={(e) => setStage(e.target.value)}>
                                <option value="">Any</option>
                                <option value="Pre-Moult">Pre-Moult</option>
                                <option value="Moulting">Moulting</option>
                                <option value="Post-Moult">Post-Moult</option>
                                <option value="Exuviae">Exuviae</option>
                                <option value="Multiple">Multiple</option>
                            </select>
                        </div>

                        <div className="col-md-12 form-it">
                            <label>Life Stage</label>
                            <select value={lifeStage} onChange={(e) => setLifeStage(e.target.value)}>
                                <option value="">Any</option>
                                {lifeStageOptions.map(stage => (
                                    <option key={stage} value={stage}>{stage}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-12 form-it">
                            <label>Sex</label>
                            <select value={sex} onChange={(e) => setSex(e.target.value)}>
                                <option value="">Any</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="col-md-12 form-it">
                            <label>Captivity</label>
                            <select value={captive} onChange={(e) => setCaptive(e.target.value)}>
                                <option value="">Any</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div className="col-md-12 form-it">
                            <label>Release Year</label>
                            <div className="row">
                                <div className="col-md-6">
                                    <select value={yearFrom} onChange={(e) => setYearFrom(e.target.value)}>
                                        <option value="">From</option>
                                        {yearOptions.map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <select value={yearTo} onChange={(e) => setYearTo(e.target.value)}>
                                        <option value="">To</option>
                                        {yearOptions.map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <input className="submit" type="submit" value="Apply Filters" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Sidebar;
