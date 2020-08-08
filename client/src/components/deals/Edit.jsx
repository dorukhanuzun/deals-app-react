import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

  const id = props.location.state.id; 

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    price: '',
    websiteURL: '',
    status: 'Warm'
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const dealResponse = await Axios.get(`/api/deals/${id}`);
      if (dealResponse.status === 200) setInputs(dealResponse.data);
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await Axios.post('/api/deals/update', inputs);

      if (response.status === 200)  {
        toast("The deal was updated successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the deal", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast(`There was an issue updating the deal ${error}`,  {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/deals"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Edit Deal Post</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tell us more about the deal</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              onChange={handleInputChange}
              value={inputs.content}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              as="textarea"
              name="price"
              onChange={handleInputChange}
              value={inputs.price}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Website URL</Form.Label>
            <Form.Control
              as="textarea"
              name="websiteURL"
              onChange={handleInputChange}
              value={inputs.websiteURL}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Is this a hot deal or warm?</Form.Label>
            <Form.Control
              as="select"
              name="status"
              onChange={handleInputChange}
              defaultValue={inputs.status || 'Warm'}
            >
              <option value="Warm">Warm</option>
              <option value="Hot">Hot</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Update</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default Edit;