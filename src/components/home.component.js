import {Link} from 'react-router-dom'; 
import React, {useEffect, useState, useContext} from 'react';
import AuthContext from "../context/AuthContext"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiUpload} from 'react-icons/fi';
import  {BsDiscord} from 'react-icons/bs';
import  {AiFillTwitterCircle, AiFillFacebook}  from 'react-icons/ai';
import {FiFacebook} from 'react-icons/fi';
import {HiOutlineSparkles} from 'react-icons/hi'
import {VscEdit} from 'react-icons/vsc'
import { useNavigate } from "react-router-dom"
import Image from 'react-bootstrap/Image'
import {BsPencilFill} from 'react-icons/bs'


const MyPage = () => {
  let { profile, getProfile, authTokens, logoutUser} = useContext(AuthContext)
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagedata, setImagedata] = useState(null);
  let [fileName, setFileName] = useState([]);
  const [primaryColor, setPrimaryColor] = useState('#007bff');
  const [secondaryColor, setSecondaryColor] = useState('#6c757d');
  const [description, setDescription] = useState('Default Description');
  let[filedata, setFiledata] = useState();
  let[botname, setBotname] = useState();
  const handleImageUpload = (event) => {
    const uploadedImage = URL.createObjectURL(event.target.files[0]);
    setImage(uploadedImage);
  };
  useEffect(()=> {
    getProfile();

},[]

)
console.log(primaryColor)

  const handleColorChange = (color, isPrimary) => {
    if (isPrimary) {
      setPrimaryColor(color);
    } else {
      setSecondaryColor(color);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  let formdata = new FormData()
        console.log(formdata)
        formdata.append('file', filedata);
        formdata.append('name', botname);
        formdata.append('primary_color', primaryColor);
        formdata.append('secondary_color', secondaryColor);
        formdata.append('icon', imagedata);

        let redirectupload = () => {

          navigate('/')
      }

        let uploadFile = async()=>{
            let response = await fetch('https://access-ai.onrender.com/bots', {
          method:'POST',
          headers:{
              //'Content-Type': 'application/json',
              //'Accept-Content': 'application/json',
              
              
              'Authorization':'Bearer ' + String(authTokens.access),
            
              
          },
         
          body:formdata
          
  
      })
      let data = await response.json()
      console.log(filedata)
      console.log(image)

  

      if(response.status === 201){
          console.log(data)
          console.log(data.message)
          alert("Bot generated")
          redirectupload();
          
      }else if(response.status === 400){
          console.log(data)
          console.log(data.message)
          
      }
  
  }
  

  return (
    <form encType="multipart/form-data" onSubmit={uploadFile}>
        <Container className="my-4">
      <Row>
        <Col>
          <h1 className="text-center">AccessAI</h1>
        </Col>
      </Row>
      <Row className="justify-content-center my-3">
        <Col xs="auto">
          <Button variant="secondary" className="mx-2" style={{ backgroundColor: 'white',color:'black'}}>
          <BsDiscord className="button-icon" />
          <span style={{marginLeft:'5px'}}>Join Discord</span>
          </Button>
          <Button variant="secondary" className="mx-2" style={{ backgroundColor: 'white',color:'black' }}>
          <AiFillTwitterCircle className="button-icon" />
          <span style={{marginLeft:'5px'}}>Post to twitter</span>
          </Button>
          <Button variant="secondary" className="mx-2" style={{ backgroundColor: 'white',color:'black' }}>
            <AiFillFacebook className="button-icon" />
            <span style={{marginLeft:'5px'}}>Share on Facebook</span>
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Card className="my-4">
            <Card.Body>
              <div className="text-center">

                <p className="mt-2">Drag PDF here</p>


                <input
  type="file"
  id=""
  className="d-none"
 onChange={(e) => (setFiledata(e.target.files[0]),setFileName(e.target.files[0].name))}
/>

<label htmlFor="file-input" className="mb-0 me-2">
  <FiUpload size={48} />
</label>

{fileName && <p>Selected file: {fileName}</p>}



              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                <input type="file" id="file-input" className="d-none" onChange={(e) => (setFiledata(e.target.files[0]),setFileName(e.target.files[0].name))}/>
                <label htmlFor="file-input" className="mb-0 me-2">
                  <p style={{color:'blue'}}>Browse my pc</p>
                </label>
                </div>
                <div>
                  <a href="#" className="ml-3">From URL</a>
                  <a style={{marginLeft:'15px'}} href="#" className="ml-3">Find a PDF</a>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <h4><VscEdit/>Customize Your Chatbot</h4>
        </Col>
        <Col sm={12} md={6} className="text-left my-4">
          <h5>Colors</h5>
          
    
          <div className="d-flex justify-content-left">
  <div className="circle-input">
    <input
      type="color"
      className="mx-2"
      value={primaryColor}
      onChange={(e) => handleColorChange(e.target.value, true)}
    />
    
  </div>
  <div className="circle-input">
    <input
      type="color"
      className="mx-2"
      value={secondaryColor}
      onChange={(e) => handleColorChange(e.target.value, false)}
    />
  </div>
</div>
<div>
            <span style={{ color: primaryColor, borderRadius: '50%', padding: '10px' }}>Primary</span>
            
            <span style={{ color: secondaryColor, borderRadius: '50%', padding: '5px' , marginLeft:'35px' }}>Secondary</span>
          </div>
          <div className='pt-4'>
            <h6>Icon</h6>
            <div className="rounded-circle position-relative d-flex justify-content-center align-items-center" style={{ width: '200px', height: '200px', background: 'lightgray' }}>
      {image ? (
        <img src={image} alt="Uploaded Image" className="rounded-circle" style={{ width: '90%', height: '90%', objectFit: 'cover' }} />
      ) : (
        <div className="text-center">Select Icon</div>
      )}
      <div className="position-absolute top-0 end-0 p-2">
        <label htmlFor="image-upload" className="btn btn-link m-0 p-0">
          <BsPencilFill/>
        </label>
        <input
          type="file"
          id="image-upload"
          className="visually-hidden"
          accept="image/*"
          onChange={(e) => (setImagedata(e.target.files[0]))}
        />
      </div>
    </div>
    </div>
        </Col>
        <Col sm={12} md={6} className="text-center my-4">
          <div>
            <h4>Tone (Optional)</h4>
            <p>Description</p>
            <textarea
            style={{backgroundColor:'#D9D9D9'}}
              className="form-control"
              rows={5}
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div>
            <h4>Restriction message(optional)</h4>
            <p>Description</p>
            <textarea
            style={{backgroundColor:'#D9D9D9'}}
              className="form-control"
              rows={5}
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
        </Col>
        <Col xs={12}>
          <div className='d-flex justify-content-center'>
           
            
              <Button type='submit' variant="secondary" className="mx-2" style={{ backgroundColor:'#03093F',color:'white'}} onClick={(e) => {
                e.preventDefault();
                uploadFile();
              }}>
          <HiOutlineSparkles className="button-icon" color='yellow'/>
          <span style={{marginLeft:'5px'}}>Generate Chatbot</span>
          </Button>
            
            
          </div>
        </Col>
        <Col>
        <div className='pt-3 d-flex justify-content-center'>
        <p>Powered by Blip Media Solutions</p>

        </div>
        </Col>
      </Row>
      <style jsx>{`
  .circle-input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 80px;
    border-radius: 50% !important;
    background-color: #ffffff;
  }
  .circle-input input {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 50%;
    padding: 0;
    margin: 0;

  }
  body, p{
    font-family: 'Roboto', sans-serif;
  }
  AiFillFacebook
  
`}</style>
    </Container>
    </form>
  );
};

export default MyPage;


