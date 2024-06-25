import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css'; // Assuming you have a CSS file for additional styles and animations

export const Gallery = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:3001/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(`error: ${e}`);
      });
  };

  const handlePost = () => {
    if (editingId) {
      axios.put(`http://localhost:3001/users/${editingId}`, { first_name, last_name, email, password, phone_number })
        .then(() => {
          alert("Data updated successfully");
          fetchData();
          resetForm();
        })
        .catch((e) => {
          console.log(`error: ${e}`);
        });
    } else {
      axios.post("http://localhost:3001/users", { first_name, last_name, email, password, phone_number })
        .then(() => {
          alert("Data saved successfully");
          fetchData();
          resetForm();
        })
        .catch((e) => {
          console.log(`error: ${e}`);
        });
    }
  };

  const handleEdit = (item) => {
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setEmail(item.email);
    setPassword(item.password);
    setPhoneNumber(item.phone_number);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        alert("Data deleted successfully");
        fetchData();
      })
      .catch((e) => {
        console.log(`error: ${e}`);
      });
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setEditingId(null);
  };

  return (
    <div style={styles.container}>
      <h1 className="form-title">Sign Up</h1>
      <input
        type='text'
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        style={styles.input}
        className="form-input"
      />
      <input
        type='text'
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        style={styles.input}
        className="form-input"
      />
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={styles.input}
        className="form-input"
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={styles.input}
        className="form-input"
      />
      <input
        type='text'
        value={phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        style={styles.input}
        className="form-input"
      />
      <button
        onClick={handlePost}
        style={styles.button}
        className="form-button"
      >
        {editingId ? "Update" : "Sign up"}
      </button>
      {/* <div style={styles.dataContainer}>
        {data.map((item) => (
          <div key={item.id} style={styles.dataItem}>
            <h3>{item.first_name} {item.last_name}</h3>
            <p>Email: {item.email}</p>
            <p>Phone Number: {item.phone_number}</p>
            <button onClick={() => handleEdit(item)} style={styles.editButton}>Edit</button>
            <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div> */}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
//   editButton: {
//     width: '48%',
//     padding: '10px',
//     fontSize: '16px',
//     backgroundColor: 'grey',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     marginBottom: '10px',
//     marginRight: '4%',
//   },
//   deleteButton: {
//     width: '48%',
//     padding: '10px',
//     fontSize: '16px',
//     backgroundColor: 'red',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     marginBottom: '10px',
//   },
  dataContainer: {
    marginTop: '30px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dataItem: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '10px',
    margin: '5px',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '4px',
  }
};
