import React, { useState, useEffect } from 'react';
// import deleteimg from '../pages/delete.png';
// import eyeimg from './eye.png';

import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address;
  website: string;
}

export default function Product() {
  const navigate = useNavigate();
  const location = useLocation();
  const updatedData = location.state && location.state.updatedData;

  const existingData: UserData[] = JSON.parse(localStorage.getItem('AllUserData') || '[]');

  const [userData, setUserData] = useState<UserData[]>([]);
  const [deleteId, setDeleteId] = useState<number>(-1);

  useEffect(() => {
    // fetching the data from the api
    async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: UserData[] = await response.json();
        const tempData = [...data, ...existingData];
        setUserData(tempData);
        localStorage.setItem('AllUserData', JSON.stringify(tempData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    // this is implemented to stop the useEffect from running twice
    const checkData: UserData[] | null = JSON.parse(localStorage.getItem('AllUserData') || 'null');
    if (checkData === null) {
      fetchData();
    } else {
      setUserData(checkData);
    }
  }, []);

  useEffect(() => {
    if (location.state !== null) {
      const allUserData: UserData[] = JSON.parse(localStorage.getItem('AllUserData') || 'null') || [];
      setUserData(allUserData);
    }

  }, [location.state]);

  // to remove the user data 
  async function handleRemoveTask() {
    const tempArr = userData.filter((item) => item.id !== deleteId);

    //deleting the item from JSON api
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${deleteId}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      console.log("item deleted from api")
    }


    setDeleteId(-1);
    setUserData(tempArr);
    localStorage.setItem('AllUserData', JSON.stringify(tempArr));

  }

  // to add new data
  function handleAddTask() {
    navigate('/form');
  }

  //to change userdata
  function handleEditTask(editItem: UserData) {
    localStorage.setItem('AllUserData', JSON.stringify(userData));
    navigate('/form', { state: { editData: editItem } });
  }

  return (
    <div>
      <Navbar />

      <br />
      <br />
      <center>
        <h2>User Data</h2>
      </center>

      <button type="button" className="btn btn-success" onClick={handleAddTask} style={{ float: 'right', marginRight: '50px' }}>
        ADD
      </button>

      <br />
      <br />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Details</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>
          {userData &&
            userData.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={`#extraDetails-${item.id}`}
                  >
                    {/* <img  alt='img missing' style={{ height: "25px", width: "25px" }} /> */}
                  </button>
                </td>
                <td >
                  <button onClick={() => handleEditTask(item)} type="button" className="btn btn-light btn-sm">
                    <b> Edit</b>
                  </button>
                </td>
                <td >
                  <button
                    onClick={() => setDeleteId(item.id)}
                    type="button"
                    className="btn btn-light btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteconfirmation"
                  >
                    {/* <img src={deleteimg} alt='img missing' style={{ height: "25px", width: "25px" }} /> */}
                  </button>
                </td>

                {/* extra details pop up code */}
                <section id="extra-details-box">
                  {/* Modal */}
                  <div
                    className="modal fade"
                    id={`extraDetails-${item.id}`}
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            {item.name}
                          </h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                          <b>Name : </b>
                          {item.name}
                          <br />
                          <b>User Name : </b>
                          {item.username}
                          <br />
                          <b>E-mail : </b>
                          {item.email}
                          <br />
                          <b>Address : </b> {item.address.street} , {item.address.suite} , {item.address.city} ,{' '}
                          {item.address.zipcode} <br />
                          <b>Phone : </b>
                          {item.phone}
                          <br />
                          <b>Website : </b>
                          {item.website}
                          <br />
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pop-up Box jsx code */}
      <section id="pop-up-box">
        {/* Modal */}
        <div
          className="modal fade"
          id="deleteconfirmation"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Confirm!
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">Are you sure you want to delete this record?</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  No
                </button>
                <button onClick={handleRemoveTask} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
