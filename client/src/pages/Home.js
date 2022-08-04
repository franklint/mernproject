import React from 'react';
// new -- import the apollo hooks
import { useQuery } from '@apollo/react-hooks';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';



// new -- add JSON web token (JWT)
import Auth from '../utils/auth';
// new -- import queries
import { QUERY_THOUGHTS, QUERY_ME_BASIC} from '../utils/queries';
import FoodContainer from '../components/Food';

import SearchContainer from '../components/Search';


const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const thoughts = data?.thoughts || []; 
  const loggedIn = Auth.loggedIn();

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h3 className='card-header'>Google Other Things?</h3>
          <div className='card-body'>


      <div className="d-flex justify-content-end">     


                {/* <div className={`col-12 mb-3 `}>
                      <h2>Locate a Restaurant Nearby</h2>
                      <div ><FoodContainer></FoodContainer> </div>
                </div> */}
                
                <div className={`col-12 mb-3`}>
                    <h2>Search Recipe By Ingredients Above!</h2>         
                    
                  
                 <div className={`col-12 mb-3`}>
                        <h2>Search Restaurants Here</h2>  
                        </div>   
                            <div class="link">
                              <div class="indent">
                              <SearchContainer></SearchContainer>
                              </div>  
                           
                          
                            </div> 
                    </div>                      
        </div> 
    </div>
  </div>
</div>

      <div className="flex-row justify-space-between">   
      

        {loggedIn && (

          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}      
          <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
              {loading ? (
                <div>Loading...</div>
             ) : (
                <ThoughtList thoughts={thoughts} title="Discuss with friends:" />
              )}
            </div>

 


    </div>
  </main>
  );
};


export default Home;
