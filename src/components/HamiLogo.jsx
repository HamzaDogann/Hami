const style = {
  gradientText: {
    background: 'linear-gradient(45deg, #3498db, #b34fa6, #00249b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
};

const HamiLogo = ({}) => {
  return (
    <h1 className="text-6xl sm:text-6xl md:text-8xl lg:text-8xl xl:text-8xl" style={style.gradientText}>
      Hami
    </h1>
  );
};

export default HamiLogo;
