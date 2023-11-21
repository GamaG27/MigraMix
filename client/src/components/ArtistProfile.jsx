import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../assets/Slide.css';
import data from './ArtistsSection/ArtistsList.json';

const ArtistProfile = () => {
  const randomCompare = () => Math.random() - 0.5;
  const shuffledArtists = data.sort(randomCompare);

  return (
    <div className="max-w-4xl mx-auto ">
      <Carousel showThumbs={false}>
        {shuffledArtists.map((artist) => (
          <div key={artist.id} className="relative ">
            <div
              style={{
                backgroundImage: `url(${artist.artistProfilePicture})`,
              }}
              className="bg-cover bg-clip-border bg-center h-[30rem] text-gray-700 shadow-xl"
            >
              <div className="to-bg-black-10 h-full bg-gradient-to-t from-black/80 via-black/50"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end items-start text-white p-8 m-5">
              <h2 className="mb-4 block text-3xl font-bold leading-[1.5] tracking-normal p-18 m-2 font-custom">
                {artist.username}
              </h2>
              <div>
                <h5 className="block font-custom text-lg font-semibold leading-snug tracking-normal text-gray-200 p-18 whitespace-pre-wrap text-ellipsis m-2">
                  {artist.artistBio}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ArtistProfile;
