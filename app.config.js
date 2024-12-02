import 'dotenv/config';

export default{
    expo: {
      name: "taxiapp",
      slug: "taxiapp",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "automatic",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff",
          userInterfaceStyle: "automatic"
        }
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      extra:{
        GOOGLE_MAP_API: process.env.GOOGLE_MAP_API,
        GOOGLE_MAP_URL:process.env.GOOGLE_MAP_URL,
        GOOGLE_PLACE_DETAILS_URL: process.env.GOOGLE_PLACE_DETAILS_URL,
    }
    }
  };
  