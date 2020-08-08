import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {

  const [deals, setDeals] = useState([]);

  useEffect(() => {
    (async () => {
      await getDeals();
    })();
  }, []);

  const getDeals = async () => {
    const dealsResponse = await Axios.get('/api/deals');
    if (dealsResponse.status === 200) setDeals(dealsResponse.data);
  };

  const deleteDeal = async deal => {
    try {
      const response = await Axios.post('/api/deals/delete', {
        id: deal._id
      });

      if (response.status === 200) toast("The deal was deleted successfully", {type: toast.TYPE.SUCCESS});

      await getDeals();
    } catch (error) {
      toast("There was an error deleting the deal", {type: toast.TYPE.ERROR});
    }
  };

  return (
    <Container className="my-5">
      <header>
        <h1>Deals</h1>
      </header>

      <hr/>

      <div className="content">
        {deals && deals.map((deal, i) => (
          <div key={i} className="card my-3">
          <div className="card-header">
            {deal.status} Deal
            { deal.status === 'Hot'  ? (
              <svg style={{float:"right"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.788 2.788 0 01-1.436-.874A3.21 3.21 0 003 10c0 2.53 2.164 4.5 4.998 4.5zM9.533.753C9.496.34 9.16.009 8.77.146 7.035.75 4.34 3.187 5.997 6.5c.344.689.285 1.218.003 1.5-.419.419-1.54.487-2.04-.832-.173-.454-.659-.762-1.035-.454C2.036 7.44 1.5 8.702 1.5 10c0 3.512 2.998 6 6.498 6s6.5-2.5 6.5-6c0-2.137-1.128-3.26-2.312-4.438-1.19-1.184-2.436-2.425-2.653-4.81z"></path></svg>
             ) : null }
           </div>

           <div class="card-body">
            <h5 class="card-title">{deal.title }</h5>

            <p class="card-text">{ deal.content }</p>
            <a href={`https://${deal.websiteURL}`} class="btn btn-primary">{deal.websiteURL}</a>
            </div>

            {user ? (
              <div className="card-body" style={{float: "right"}}>
                <Link to={{
                  pathname: "/deals/edit",
                  state: {
                    id: deal._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deleteDeal(deal)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}

            
            <div class="card-footer text-muted">
              Shared by: { deal.user.fullname } <small style={{float:"right"}}>{ deal.createdAt }</small>
            </div>
        </div>
        ))}
      </div>
    </Container>
  );
};

export default Index;