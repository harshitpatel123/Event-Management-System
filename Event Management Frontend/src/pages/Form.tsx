import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar'

let index = 100;  // creating index variable as a failsafe if no id is assign


export default function Form() {
    const location = useLocation();
    const editData = location.state && location.state.editData;

    const navigate = useNavigate();
    const [id, setid] = useState(editData ? editData.id : index++)
    const [name, setname] = useState(editData ? editData.name : '')
    const [username, setusername] = useState(editData ? editData.username : '')
    const [email, setemail] = useState(editData ? editData.email : '')
    const [street, setstreet] = useState(editData ? editData.address.street : '')
    const [suite, setsuite] = useState(editData ? editData.address.suite : '')
    const [city, setcity] = useState(editData ? editData.address.city : '')
    const [zipcode, setzipcode] = useState(editData ? editData.address.zipcode : 0)
    const [phone, setphone] = useState(editData ? editData.phone : 0)
    const [website, setwebsite] = useState(editData ? editData.website : '')




    const HandleSave = (e:any) => {
        e.preventDefault()          // to stop reloading the page
        const formData = {
            id,
            name,
            username,
            email,
            address: {
                street,
                suite,
                city,
                zipcode,
            },
            phone,
            website,
        };

        // Save the form data to local storage 
        // this logic checks if this data is new or updated
        //for new data
        if (location.state === null) {
            const existingDataStr = localStorage.getItem('AllUserData');
            const existingData = existingDataStr ? JSON.parse(existingDataStr) : [];
            let lastIndex = existingData.length;
            formData.id = lastIndex > 0 ? existingData[lastIndex - 1].id + 1 : 1;
            const newData = [...existingData, formData];
            localStorage.setItem('AllUserData', JSON.stringify(newData));
            navigate('/product');
        }
        // for updated data
        else {
            let AllUserData = JSON.parse(localStorage.getItem('AllUserData') || '[]');
            const newUpdatedData = AllUserData.map((item: { id: any; }) => {
                if (item.id === formData.id) {
                    return formData;
                }
                return item;
            });

            // updating resource in JSON api
            fetch(`https://jsonplaceholder.typicode.com/users/${formData.id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log("item updated in api",json));

            // updating resource in local storage
            localStorage.setItem('AllUserData', JSON.stringify(newUpdatedData));
            navigate('/product', { state: { updatedData: formData } });
        }

    };

    return (
        <div>
            <Navbar />

            <center><h1>ADD / EDIT FORM</h1></center>
            <div style={{ width: "70%", margin: "auto" }}>



                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">
                            Name
                        </label>
                        <input value={name} onChange={(e) => setname(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">
                            User Name
                        </label>
                        <input value={username} onChange={(e) => setusername(e.target.value)} type="text" className="form-control" id="inputPassword4" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            E-Mail
                        </label>
                        <input
                            value={email} onChange={(e) => setemail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="inputAddress"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputAddress2" className="form-label">
                            Street
                        </label>
                        <input
                            value={street} onChange={(e) => setstreet(e.target.value)}
                            type="text"
                            className="form-control"
                            id="inputAddress2"
                            placeholder="Apartment, studio, or floor"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">
                            Suite
                        </label>
                        <input value={suite} onChange={(e) => setsuite(e.target.value)} type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">
                            City
                        </label>
                        <input value={city} onChange={(e) => setcity(e.target.value)} type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputZip" className="form-label">
                            Zip
                        </label>
                        <input value={zipcode} onChange={(e) => setzipcode(e.target.value)} type="text" className="form-control" id="inputZip" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">
                            Phone
                        </label>
                        <input value={phone} onChange={(e) => setphone(e.target.value)} type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">
                            Website
                        </label>
                        <input value={website} onChange={(e) => setwebsite(e.target.value)} type="text" className="form-control" id="inputCity" />
                    </div>

                    <div className="col-12">
                        <button onClick={HandleSave} className="btn btn-primary">
                            SAVE
                        </button>
                    </div>
                </form>


            </div>
        </div>
    )
}
