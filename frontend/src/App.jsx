import { useState, useEffect } from "react";
import axios from "axios";


const API_URL = "http://localhost:3000/profiles";

const App = () => {
  const [profiles, setprofiles] = useState([]);
  const [name, setName] = useState("");
   const [eamil, setemail] = useState("");
    const [address, setaddress] = useState("");
     const [phone, setphone] = useState("");
      const [age, setage] = useState("");

  const [editingId, setEditingId] = useState(null);


  const fetchProfiles = async () => {
    try {
      const response = await axios.get(API_URL);
      setprofiles(response.data.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    const loadprofiles = async () => {
      try { 
        const response = await axios.get(API_URL);
        setprofiles(response.data.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    loadprofiles();
  }, []);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !eamil || !address || !phone || !age ) return alert("Please fill in all fields");

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, { name });
        setEditingId(null);
      } else {
        await axios.post(API_URL, { name });
      }

      setName("");
      setaddress("");
      setage("");
      setphone("");
      setemail("");
      setprofiles("");

      
      fetchProfiles();
    } catch (error) {
      console.error("Error saving student data:", error);
    }
  };


  return (
    <div>
      <h1>profile management</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit profile" : "Add New profile"}</h3>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
          <input
          type="eamil"
          placeholder="Enter your eamil"
          value={eamil}
          onChange={(e) => setemail(e.target.value)}
        /> 
          <input
          type="phone"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
        />

          <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
        />

          <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setage(e.target.value)}
        />
       
        <button type="submit">{editingId ? "Update" : "Add profile"}</button>
       
      </form>

   
      <h3>profile list</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>eamil</th>
            <th>age</th>
            <th>phone</th>
            <th>address</th>
            
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{profile.name}</td>
              <td>{profile.age}</td>
              <td>{profile.eamil}</td>
              <td>{profile.address}</td>
              <td>{profile.phone}</td>
              
              <td>

              <button type = "submit"></button>

              
                {/* <button onClick={() => handleEditClick(profile)}>Edit</button> */}

               
              </td>
               
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

