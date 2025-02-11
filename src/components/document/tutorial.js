import React from "react";
import "./tutorial.css"; 


const Tutorial = () => {
  return (
    <div className="tutorial container">
      <h1>How to Upload Images to the Project</h1>
      <p>Follow these steps to successfully upload an image.</p>

      {/* Step 1 */}
      <div className="tutorial-step">
        <h2>Step 1: Add an Observation</h2>
        <p>Click the "Add Observations to This Project" button on the project page.</p>
        <img src={require("../../assets/images/uploads/tutorial/1-add-observation.png")} alt="Add observations to the project" />
      </div>

      {/* Step 2 */}
      <div className="tutorial-step">
        <h2>Step 2: Choose an Image</h2>
        <p>Upload a photo from your device or select an image from external sources.</p>
        <img src={require("../../assets/images/uploads/tutorial/2-choose-file.png")} alt="Choose an image to upload" />
      </div>

      {/* Step 3 */}
      <div className="tutorial-step">
        <h2>Step 3: Fill in the Details</h2>
        <p>Provide the species name, location, and any additional notes about the image.</p>
        <img src={require("../../assets/images/uploads/tutorial/3-fill-fields.png")} alt="Fill observation details" />
      </div>

      {/* Step 4 */}
      <div className="tutorial-step">
        <h2>Step 4: Save the Observation</h2>
        <p>Once all details are filled in, click "Save Observation" to submit your entry.</p>
        <img src={require("../../assets/images/uploads/tutorial/4-save-observation.png")} alt="Save the observation" />
      </div>

      <p className="footer-note">Need help? Contact our support team for assistance.</p>
    </div>
  );
};

export default Tutorial;
