import { useState, useEffect } from "react";
import axios from "axios";

 const API_URL = "https://my-profile-backend.onrender.com/profiles";

const App = () => {
  const [profiles, setProfiles] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const [editingId, setEditingId] = useState(null);

 
  const fetchProfiles = async () => {
    try {
      const response = await axios.get(API_URL);
      setProfiles(response.data.data || response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !address || !phone || !age) {
      return alert("Please fill all fields");
    }

    const profileData = {
      name,
      email,
      address,
      phone,
      age,
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, profileData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, profileData);
      }

      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setAge("");

      fetchProfiles();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit
  const handleEdit = (profile) => {
    setName(profile.name);
    setEmail(profile.email);
    setAddress(profile.address);
    setPhone(profile.phone);
    setAge(profile.age);

    setEditingId(profile.id);
  };

  return (
    <div>
      <h1>Profile Management</h1>

      <form onSubmit={handleSubmit}>
        <h3>
          {editingId ? "Edit Profile" : "Add New Profile"}
        </h3>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button type="submit">
          {editingId ? "Update" : "Add Profile"}
        </button>
      </form>

      <h3>Profile List</h3>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{profile.name}</td>
              <td>{profile.email}</td>
              <td>{profile.age}</td>
              <td>{profile.phone}</td>
              <td>{profile.address}</td>

              <td>
                <button onClick={() => handleEdit(profile)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;