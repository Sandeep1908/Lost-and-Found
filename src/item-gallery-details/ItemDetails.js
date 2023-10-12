import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './details.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import dark from './dark.jpg';
import { collection, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { doc ,setDoc} from 'firebase/firestore';

const ItemDetails = (props) => {

    const [fetched, setFetched] = useState(false);
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

    const { id } = useParams();
  
 
    // API call
  
    useEffect(() => {
        async function fetchData() {
            try {
                const itemRef=doc(db,'FoundUpload',id)
                 getDoc(itemRef)
              
            //    console.log("lsdlkasd",doc.data())
                .then((res)=>{
                   
                   
                    setItems(res.data())
                    setFetched(true)
                   
                })

            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (props.theme === 'dark') {
            document.body.style.background = `url(${dark}) `;
            document.body.style.backgroundSize = 'cover';
        }

        return () => {
            document.body.style.background = null;
        };
    }, [props.theme]);


    //handle claim
    const handleClaimItem = (itemId) => {
        setSelectedItemId(itemId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItemId('');
        setDetails('');
        setName('');
        setEmail('');
        setSapId('');
        setBranch('');
        setYear('');
        setContactNumber('');
    };

    const handleSubmit = async () => {
        try {
            
            await setDoc(doc(db,'ClaimItems',id),{
             
                details:details,
                name:name,
                email:email,
                sapId:sapId,
                branch:branch,
                year:year,
                contactNumber:contactNumber,
            }).then((res)=>{
                console.log(res)
                alert('data added')
            })




            handleClose();
        } catch (error) {
            console.log(error.message);
        }
    };

   
 
console.log("itesmss",Items.description)
    return (
        <>
            {fetched &&
                (<div className='card-wrapper' style={{ marginBottom: '150px' }}>
                    <div className="cards" >
                        <div className="image">
                            <img src={Items.image || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw0ZktTw0tlB8RYvY07RxbMA&ust=1696676309160000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCupfeh4YEDFQAAAAAdAAAAABAE'} alt="item" />
                        </div>
                        <div class="content">
                            <h2 className={`title ${props.theme === 'dark' ? 'dark-mode' : ''}`} style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : ''}` }}>{Items.subcategory}</h2>

                            <div class="detail" style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : ''}` }}>
                                <h2 style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : ''}` }}>Description: </h2>
                                <p >{Items.description}</p>

                                <ul>
                                    <li style={{ paddingBottom: "1rem", paddingTop: "1rem" }}><i className="fa-solid fa-location-dot" style={{ color: "red", fontSize: "30px", paddingRight: "1rem" }}></i> Place: <span style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : 'black'}` }}>{Items.place}</span></li>
                                    <li style={{ paddingBottom: "1rem" }}><i class="fa-solid fa-calendar-days" style={{ color: "red", fontSize: "30px", paddingRight: "1rem" }}></i> Date: <span style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : 'black'}` }}>{Items.date}</span></li>
                                </ul>
                            </div>

                            <div class="info">
                                <Button className="bt" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", borderRadius: "10px" }} variant="contained" color="secondary" onClick={() => handleClaimItem(Items._id)}> Claim Item </Button>
                            </div>
                        </div>

                    </div>
                </div >
                )}
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
    )
}

export default ItemDetails
