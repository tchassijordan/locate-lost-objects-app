import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../utils/AuthContext';

function ProtectedRoute({ children }: TProps): ReactElement {
  const { user } = UserAuth();
  const navigate = useNavigate();

  if (!user) navigate('/sign_in');

  return children;
}

export default ProtectedRoute;

type TProps = {
  children: ReactElement;
};
