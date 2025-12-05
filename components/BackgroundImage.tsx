const BackgroundImage = () => (
  <div
    className="fixed inset-0 -z-4 w-full h-full"
    style={{
      backgroundImage: "url('/images/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    aria-hidden="true"
  />
);

export default BackgroundImage;
