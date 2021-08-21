import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../redux';

const AuthorizationSoft = (ChildComponent: any) => {
  const ComposedComponent = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({
        type: ActionTypes.SOFT_AUTHORIZATION,
      });
    }, []);

    return (
      <ChildComponent {...props} />
    );
  };

  return ComposedComponent;
};

export default AuthorizationSoft;
