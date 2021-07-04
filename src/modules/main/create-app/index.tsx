import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../../redux/actions';
import authorization from '../../../components/authorization';
import View from './view';

const CreateApp = (props: any) => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>(null);
  const [environments, setEnvironments] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);

  const updateEnvironments = (checked: boolean, environment: string) => {
    if (checked) {
      //@ts-ignore
      setEnvironments([...(new Set([...environments, environment]))]);
    } else {
      setEnvironments(environments.filter(e => e !== environment));
    }
  };

  const updateServices = (checked: boolean, service: string) => {
    if (checked) {
      //@ts-ignore
      setServices([...(new Set([...services, service]))]);
    } else {
      setServices(services.filter(s => s !== service));
    }
  };

  const createApp = () => {
    dispatch({
      type: ActionTypes.CREATE_APP,
      payload: {
        name,
        environments,
        services,
        navigate(id: string): void {
          props.history.push(`/apps/${id}`);
        }
      },
    });
  };

  return (
    <View
      createApp={createApp}
      environments={environments}
      services={services}
      setName={setName}
      updateEnvironments={updateEnvironments}
      updateServices={updateServices}
    />
  );
};

export default authorization(CreateApp);
