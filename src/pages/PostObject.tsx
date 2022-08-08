import React, { useState } from 'react';
//import { useParams } from 'react-router';
import pic from '../assets/hero-bg.jpg';
import Main from '../layout/main';
import LoadingSVG from '../assets/icons/LoadingSVG';

export default function PostObject() {
  const object: TObject = {
    id: '1',
    title: 'PassPort',
    description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at viverra lacus, ut euismod tortor. Ut scelerisque a lorem ac pulvinar. Curabitur varius ligula dui. Morbi pretium augue augue, ac eleifend dui porttitor eu. Donec vel tempus erat, vitae finibus mi. Cras mollis egestas mi ac elementum. Phasellus elementum sapien at purus vehicula, ac fringilla magna ultrices.

        Mauris quis congue augue, in lacinia leo. Nunc pharetra sollicitudin suscipit. Ut metus risus, tristique ac justo sed, iaculis egestas lacus. Vestibulum hendrerit convallis magna, vitae cursus elit tristique pellentesque. Curabitur sagittis orci vitae odio pharetra, quis vestibulum lorem dictum. Donec pellentesque lectus tellus, eu ullamcorper risus tincidunt in. Cras sed fermentum dolor. Proin eu augue porttitor, scelerisque leo porta, sodales metus.

        Mauris faucibus eros in felis iaculis, eget pulvinar felis tempus. Nunc nec placerat diam, in pellentesque nibh. Quisque in commodo nisl, et rhoncus ante. Maecenas non bibendum urna, nec egestas sem. Morbi nibh ligula, lacinia in facilisis at, facilisis a quam. Quisque et ante vestibulum ipsum euismod faucibus. Ut vel dolor erat. Nulla ornare tortor eu erat tempor malesuada. Donec vulputate ipsum id ligula viverra luctus. Quisque orci enim, bibendum sed maximus et, placerat sit amet turpis. In ornare nisl at lorem sodales, et sollicitudin diam tristique.
      `,
    date: '10-Jul-2022',
    location: 'Yaoundé'
  };

  /* 
  ===================================================
  Dynamic routing isn't functional
  ===================================================
  */

  const [lostObjData] = useState<TObject>(object);
  // const [lostObjData, setLostObjData] = useState<TObject>(object);
  //const [isLoading, setISLoading] = useState(true);
  //const apiID = useParams();

  // useEffect(() => {
  //   if (isLoading) {
  //     async function fetcher<TObject>(): Promise<TObject> {
  //       const res = await fetch(`http://127.0.0.1:8000/api/Passports/35`);
  //       const json = await res.json();
  //       setISLoading(false);
  //       setLostObjData(json);
  //       return json;
  //     }
  //     fetcher();
  //   }
  // });

  return (
    <Main>
      {lostObjData ? (
        <div className='flex justify-center items-center w-full max-h-[calc(100vh_-_theme(height.20))]'>
          <div className='space-x-10 max-w-6xl py-16 px-4 flex'>
            <div className='basis-3/6 h-full shadow-md'>
              <img
                className='w-full h-full object-cover object-center rounded-md'
                src={lostObjData.image ? lostObjData.image : pic}
                alt='post thumbnail'
              />
            </div>
            <div className='basis-2/5 flex flex-col space-y-4 overflow-y-scroll max-h-96'>
              <h1 className='text-xl sm:text-2xl'>{lostObjData.title}</h1>
              <div className='space-y-3'>
                <p className='text-xs sm:text-sm tracking-wide text-gray-800'>
                  {lostObjData.description}
                </p>
                <div className='space-x-4 flex text-gray-500 font-bold'>
                  <p className='text-xs sm:text-sm'>Date: {lostObjData.date}</p>
                  <p className='text-xs sm:text-sm'>
                    Location: {lostObjData.location}
                  </p>
                  {lostObjData.expiration && (
                    <p className='text-xs sm:text-sm'>
                      Expiration date: {lostObjData.expiration}
                    </p>
                  )}
                  {lostObjData.postID && (
                    <p className='text-xs sm:text-sm'>
                      Passport ID: {lostObjData.postID}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <LoadingSVG className='text-primary animate-spin w-[40px] h-[40px] mx-auto' />
        </div>
      )}
    </Main>
  );
}

export type TPostObjProps = {
  object: TObject;
};

export type TObject = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  expiration?: string;
  postID?: number;
};
