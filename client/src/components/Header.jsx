import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonExplore from './ButtonExplore';
import ButtonLogin from './ButtonLogin';

const Header = () => {
  const HeaderStyle = {
    backgroundImage: `url('/header.png')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  };
  return (
    <div className="p-12 text-center bg-cover bg-center" style={HeaderStyle}>
      <ButtonLogin />
      <Typography
        variant="h1"
        className="text-3xl md:text-5xl lg:text-7xl text-center text-[#F70808] text-800 transition duration-500 ease-in-out hover:scale-90"
        style={{ fontFamily: 'Audiowide, sans-serif' }}
      >
        MIGRAMIX
      </Typography>

      <Typography
        variant="h4"
        className="mt-6 text-bold text-xl md:text-2xl lg:text-3xl p-7 text-gray-900 "
        style={{ fontFamily: 'Nunito Sans, sans-serif' }}
      >
        Amplify Culture, Harmonize Art
      </Typography>
      <Typography
        variant="body1"
        className="mt-6 text-base md:text-lg lg:text-lg text-gray-900 text-custom"
      >
        Welcome to a vibrant platform showcasing emerging migrant artists in
        Barcelona`s electronic music scene.
        <br /> {/* Use <br /> for line breaks */}
        Let`s unite through music, creativity, and cultural diversity.
      </Typography>

      <Stack className="mt-6">
        <ButtonExplore />
      </Stack>
    </div>
  );
};

export default Header;
