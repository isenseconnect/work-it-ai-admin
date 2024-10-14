import React, { useEffect, useState } from "react";
import { apiCall } from "../helper/apiHelper";

const Reports = () => {
  const [reports, setReports] = useState([]);

  const handleBlockUser = () => {
    console.log("handleBlockuser ");
  };
  const handleReportedItem = async (action, id) => {
    console.log("action ", action);
    console.log("toolid ", id);
    const response = await apiCall("flag/action", "POST", { id, action });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall("flag/getReports");
        const { data } = response;
        console.log("data ", data);
        setReports(data);
      } catch (error) {
        console.log("error ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h2>Reports</h2>
      <div>
        {reports.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Reported by</th>
                <th>Type</th>
                <th>Toolid</th>
                <th>Title</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((tool) => (
                <tr key={tool.id}>
                  <td className="tableCell">{tool.username} username</td>
                  <td className="tableCell">{tool.entityType}</td>
                  <td className="tableCell">{tool.entityId}</td>
                  <td className="tableCell">{tool.tool.title} </td>
                  <td className="tableCell">{tool.reason}</td>
                  <td className="tableCell">
                    <button
                      onClick={() =>
                        handleReportedItem("delete", tool.entityId)
                      }
                    >
                      Delete
                    </button>
                  </td>
                  <td className="tableCell">
                    <button
                      onClick={() =>
                        handleReportedItem("ignore", tool.entityId)
                      }
                    >
                      Ignore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {reports.length === 0 && <p>No reports found.</p>}
      </div>
    </div>
  );
};

export default Reports;
