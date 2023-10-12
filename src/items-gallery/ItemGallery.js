import React, { useEffect, useState } from 'react'
import './items.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import loading from "./loading.gif";
import dark from './dark.jpg';
import { getDocs,collection, onSnapshot} from 'firebase/firestore';

import { db } from '../firebase';
const ItemGallery = (props) => {


  const [spinner, setSpinner] = React.useState(true);
  const [Items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sapId, setSapId] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const { category } = useParams();
   
  // API call
 const itemRef=collection(db,'FoundUpload')
 
  useEffect(() => {
    async function fetchData() {
      try {

        onSnapshot(itemRef, (snapshot) => {
          let results = []
         snapshot.forEach((doc)=>{
          results.push({data:doc.data(),id:doc.id})
         })
     
        setItems(results)
      })

        
     
      } catch (error) {
        console.log(error.message);
      }
      finally {
        setSpinner(false); // Hide the spinner after data is fetched
      }
    }
    fetchData();
  },[category]);

  console.log(Items)
  useEffect(() => { 
    if (props.theme === 'dark') {
      document.body.style.background = `url(${dark}) `;
      document.body.style.backgroundSize = 'cover';
    }

    return () => {
      document.body.style.background = null;
    };
  }, [props.theme]);


  const filteredItems = category ? Items.filter(item => item.data.subcategory === category) : Items;
 

  //handle claim
  const handleClaimItem = (itemId) => {
    // setSelectedItemId(itemId);
    // setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
    // setSelectedItemId('');
    // setDetails('');
    // setName('');
    // setEmail('');
    // setSapId('');
    // setBranch('');
    // setYear('');
    // setContactNumber('');
  };

  const handleSubmit = async () => {
    // try {
    //   // Validate mandatory fields
    //   if (!details || !name || !email || !sapId || !contactNumber) {
    //     console.error('Mandatory fields are missing');
    //     return;
    //   }

    //   console.log('Claiming item:', selectedItemId);

    //   const response = await fetch(`${host}/claimItem/${selectedItemId}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       details,
    //       name,
    //       email,
    //       sapId,
    //       branch,
    //       year,
    //       contactNumber,
    //     }),
    //   });

    //   if (response.ok) {
    //     console.log('Item claimed successfully');
    //     props.func(true);
    //   } else {
    //     console.error('Failed to claim item');
    //   }

    //   handleClose();
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  return (
    <>
      <h1 className="text-center" style={{color: `${props.theme === 'dark' ? '#f5f5f5' : '#333'}`}}>Items Gallery - {category}</h1>
      {spinner &&
        <div className='text-center my-5 pt-5' >
          <img src={loading} alt="loading" width="40px" />
        </div>
      }
      <div className="d-flex flex-wrap justify-content-center my-3" style={{ paddingBottom: '150px'}}>
        {filteredItems.map((item) => {

          console.log(item)
          return <div className="card-container" key={item._id}>
            <div className="cards-item">
              <img src={item.data.image || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw0ZktTw0tlB8RYvY07RxbMA&ust=1696676309160000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCupfeh4YEDFQAAAAAdAAAAABAE'} alt="items" />
              <div className="intro">
                <h2>{item.data.date}</h2>
                <Button
                  className="button"
                  size="small"
                  style={{
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    marginLeft: '15px',
                    borderRadius: '10px',
                  }}
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={`/details/${item.id}`}
                >
                  See Details
                </Button>
                {/* <Button
                  className="button"
                  size="small"
                  style={{
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    marginLeft: '40px',
                    borderRadius: '10px',
                  }}
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClaimItem(item.id)}
                >
                  Claim Item
                </Button> */}
              </div>
            </div>
          </div>
})}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Your Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            multiline
            rows={4}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="SAP ID"
            value={sapId}
            onChange={(e) => setSapId(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Claim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemGallery;
