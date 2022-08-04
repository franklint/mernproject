import React from 'react';
import {useParams } from 'react-router-dom';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import { useQuery, useMutation } from '@apollo/react-hooks';

const Profile = () => {
        const { username: userParam } = useParams();
      
        const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
          variables: { username: userParam }
        });

        const user = data?.me || data?.user || {};

      // redirect to the user profile page if logged in
        // if (Auth.loggedIn() && Auth.getProfile().data.username.toLowerCase() === userParam.toLowerCase()) {
        //   return <Redirect to="/profile" />;
        // }
        if (loading) {
          return <div>Loading...</div>;
        }
        if (!user?.username) {
          return (
            <h4>
              Log in to view this page.
            </h4>
          )
        }

        return (
          <div>          
                <div className="flex-row mb-3">
                      <h2 className="bg-dark text-secondary p-3 display-inline-block">
                        Viewing {userParam ? `${user.username}'s` : 'your'} profile
                      </h2>

                    {/* {userParam && (
                      <button className="btn ml-auto" onClick={handleClick}>
                        Add Friend
                      </button>
                    )} */}
                </div>

               <div className="flex-row justify-space-between mb-3">
               <div className="bg-dark text-secondary p-3 display-inline-block">
                  {/* <div className="col-12 mb-3 col-lg-8"> */}
                  <ThoughtList thoughts={user.thoughts} title={`${user.username}'s conversations`} />
                  </div>
                  
                    {/* <div className="col-12 col-lg-3 mb-3">
                      <FriendList
                        username={user.username}
                        friendCount={user.friendCount}
                        friends={user.friends}
                      />
                  </div>                   */}
              </div>

              <div className="mb-3">{!userParam && <ThoughtForm />}</div>

          </div>  
      );
};

export default Profile;
