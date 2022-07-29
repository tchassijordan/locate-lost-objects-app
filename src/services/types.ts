export type TServices = 'lostObjects' | 'foundObjects';

export type TServiceProps = {
  service: TServices;
  toggleModal: () => void;
};
