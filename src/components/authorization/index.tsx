import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../redux/actions';
import { StoreState } from '../../redux';
import app from '../../feathers';

const authorization = (ChildComponent: any) => {
  const ComposedComponent = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: StoreState) => state.user);
    const path = props.location.pathname;

    const [finishedAuth, setFinishedAuth] = useState<boolean>(false);

    const checkRole = async (): Promise<void> => {
      let userData = user?.details;
      let role = user?.details?.role;

      try {
        dispatch({ type: ActionTypes.SET_APP_LOADING, payload: true });    
        if (localStorage.getItem('token') && !user.details) {
          try {
            const { data } = await app.service('security/session').find();

            userData = data;
            role = userData.role;
            dispatch({ type: ActionTypes.SET_USER, payload: userData });

            // GET MY APPS
            dispatch({
              type: ActionTypes.GET_MY_APPS,
            });

            // GET GITHUB REPOS
            if (userData.github_access_key) {
              dispatch({
                type: ActionTypes.GET_GITHUB_REPOS,
              });
            }
            
            setFinishedAuth(true)
          } catch(e) {
            console.log('error', e);
            dispatch({ type: ActionTypes.SET_APP_LOADING, payload: false });  
            props.history.push('/');
          }
        }
        if (!role) {
          props.history.push('/');
        }

        setFinishedAuth(true);
        dispatch({ type: ActionTypes.SET_APP_LOADING, payload: false });  
      } catch(e) {
        console.log(e)
        dispatch({ type: ActionTypes.SET_APP_LOADING, payload: false });  
        dispatch({ type: ActionTypes.SET_APP_ERROR });
      }
    }

    useEffect(() => {
      checkRole();
    }, [user, path]);

    return finishedAuth
      ? (
        <ChildComponent {...props} />
      )
      : <div />
  }

  return ComposedComponent
};

export default authorization;
