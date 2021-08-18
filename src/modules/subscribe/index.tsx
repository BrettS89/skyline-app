import SubscribeView from './view';

const Subscribe = (props) => {
  const navigate = (plan: string) => {
    if (!localStorage.getItem('token')) {
      props.history.push(`/signup`);
    } else {
      props.history.push(`/checkout/${plan}`);
    }
  }

  return (
    <SubscribeView
      navigate={navigate}
    />
  );
};

export default Subscribe;
