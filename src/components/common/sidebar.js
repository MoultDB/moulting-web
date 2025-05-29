import React from 'react';
import './sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="search-form">
                <h4 className="sb-title">Advanced Search</h4>
                <form className="form-style-1" action="#">
                    <div className="row">
                        <div className="col-md-12 form-it">
                            <label>Species name</label>
                            <input type="text" placeholder="Enter keywords" />
                        </div>
                        <div className="col-md-12 form-it">
                            <label>Moulting Stage</label>
                            <select>
                                <option value="range">Pre-Moult</option>
                                <option value="saab">Moulting</option>
                                <option value="range">Post-Moult</option>
                                <option value="saab">Exuviae</option>
                            </select>
                        </div>
                        <div className="col-md-12 form-it">
                            <label>Sex</label>
                            <select>
                                <option value="range">Male</option>
                                <option value="saab">Female</option>
                            </select>
                        </div>
                        <div className="col-md-12 form-it">
                            <label>Release Year</label>
                            <div className="row">
                                <div className="col-md-6">
                                    <select>
                                        <option value="range">From</option>
                                        <option value="number">2010</option>
                                        <option value="number">2011</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <select>
                                        <option value="range">To</option>
                                        <option value="number">2020</option>
                                        <option value="number">2021</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <input className="submit" type="submit" value="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Sidebar;
