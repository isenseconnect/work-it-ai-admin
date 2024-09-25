import React, { useEffect, useState } from "react";
import { apiCall } from "../helper/apiHelper";
import { slugify } from "../helper/slugify";
// Component for managing the info items
const Info = () => {
  const [items, setItems] = useState([
    {
      key: "about",
      displayName: "About",
      description:
        "Welcome to our company. Here, you can learn about our history, mission, and the values that drive us. We are committed to delivering exceptional service and fostering innovation. Discover who we are and what sets us apart from the competition.",
    },
    {
      key: "copyright",
      displayName: "Copyright",
      description:
        "This section provides important information regarding copyright laws and regulations that protect our intellectual property. Understanding these rules helps ensure that our content is used appropriately and respects legal standards. Review our policies to stay compliant.",
    },
    {
      key: "contact-us",
      displayName: "Contact Us",
      description:
        "We value your feedback and are here to help. Reach out to us through various channels, including email, phone, or our contact form. Whether you have questions, need support, or want to provide feedback, we’re eager to hear from you and assist you in any way we can.",
    },
    {
      key: "developers",
      displayName: "Developers",
      description:
        "This section is tailored for developers interested in working with our APIs, SDKs, and other technical resources. Here, you’ll find documentation, code samples, and support to help you integrate our solutions into your projects. Explore our developer resources to get started.",
    },
  ]);

  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  // const [routeName, setRouteName] = useState("");

  useEffect(() => {
    const fetchInfos = async () => {
      const response = await apiCall("info/getInfo");
      const { data } = response;
      setItems(data);
    };

    fetchInfos();
  }, []);

  const handleAddItem = async () => {
    if (!displayName || !description) {
      alert(" Display Name and Description are required");
      return;
    }

    // console.log("displaynamem ", displayName);
    // console.log("description", description);
    // console.log(slugify(displayName))
    // return;
    // const slugifiedRouteName = slugify(displayName);
    // setRouteName(slugifiedRouteName);

    const response = await apiCall("info/addInfo", "POST", {
      // routeName: routeName,
      displayName: displayName,
      description: description,
    });
    const { data } = response;
    setItems(data);

    setDisplayName("");
    // setRouteName("");
    setDescription("");
  };

  const handleDeleteItem = async (infoId) => {
    const response = await apiCall("info/deleteInfo", "POST", { infoId });
    setItems(response.data);
  };

  return (
    <div>
      <h2>Footer Manager</h2>
      <div>
        {/* <input
          type="text"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          placeholder="Route Name"
        /> */}
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={handleAddItem}>Add New Link</button>
      </div>
      <div>
        <h3>Items List</h3>
        {items.length === 0 ? (
          <p>No items to display</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.infoId}>
                <h4>
                  {item.displayName} ({item.routeName})
                </h4>
                <p>{item.description}</p>
                <button onClick={() => handleDeleteItem(item.infoId)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Info;
