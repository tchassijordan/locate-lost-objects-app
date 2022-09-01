export type TServices = 'lostObjects' | 'foundObjects';

export type TServiceProps = {
  serviceType: TServices;
  onModalToggle: () => void;
  isMounted: boolean;
};
