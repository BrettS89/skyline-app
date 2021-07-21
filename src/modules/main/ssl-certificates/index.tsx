import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authorization from '../../../components/authorization';
import { ActionTypes } from '../../../redux/actions';
import { StoreState } from '../../../redux';
import View from './view';

const SSLCertificates = () => {
  const dispatch = useDispatch();
  const certificates = useSelector((state: StoreState) => state.app.certificates);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  console.log(certificates)

  const createCertificate = (awsRegion: string, domainName: string) => {
    dispatch({
      type: ActionTypes.CREATE_CERTIFICATE,
      payload: {
        aws_region: awsRegion,
        domain: domainName,
      },
    });
  };

  return (
    <View
      certificates={certificates}
      createCertificate={createCertificate}
      createModalOpen={createModalOpen}
      setCreateModalOpen={setCreateModalOpen}
    />
  );
};

export default authorization(SSLCertificates);
