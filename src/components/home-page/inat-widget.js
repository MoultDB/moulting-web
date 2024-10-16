import React, { useEffect } from 'react';
import './inat-widget.css'; // Import the widget's CSS

const InatWidget = () => {
  useEffect(() => {
    // Remove any existing widget script before adding a new one
    const widgetContainer = document.getElementById('inat-widget-script');
    widgetContainer.innerHTML = ""; // Clear previous script content if it exists
    
    // Create and append the new script for the iNaturalist widget
    const script = document.createElement('script');
    script.src = "https://www.inaturalist.org/observations/project/200497.widget?layout=large&limit=5&order=desc&order_by=observed_on";
    script.async = true;
    script.charset = "utf-8";
    widgetContainer.appendChild(script);
  }, []); // Empty dependency array ensures this runs only once after component mounts

  return (
    <div className="inat-widget">
      <div className="inat-widget-header">
        <a href="https://www.inaturalist.org">
          <img alt="iNaturalist" src="https://www.inaturalist.org/assets/logo-small.gif" />
        </a>
      </div>
      <div id="inat-widget-script"></div>
      <table className="inat-footer">
        <tbody>
          <tr className="inat-user">
            <td className="inat-value">
              <strong>
                <a rel="nofollow" href="https://www.inaturalist.org/observations?project_id=200497">
                  View more observations from Moulting arthropods on <nobr>iNaturalist »</nobr>
                </a>
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InatWidget;
