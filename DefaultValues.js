export const defaultColors = {
    light: "#F5F8FA",
    secondary: "#657786",
    tertiary: "#AAB8C2",
    myColor: "#8338ec",
    black: "#000",
    white: "#fff",
    dark: "#14171A",
  };
  //heroku
  //export const baseUrl ="https://final-year-pharmacy-backend.herokuapp.com/api/pharmacy";
  
  //gid
  export const baseUrl =
    "https://pharmacybackend.gidcharityfoundation.org/api/pharmacy";
  
  export const UserRoutes = {
    userLogin: `${baseUrl}/user/login`,
    userSignup: `${baseUrl}/user/signup`,
    uploadProduct: `${baseUrl}/user/upload/product`,
    loadProducts: `${baseUrl}/user/products`,
    loadProduct: `${baseUrl}/user/product`,
    updateProduct: `${baseUrl}/user/update/product`,
    uploadProductImages: `${baseUrl}/user/upload/product/images`,
    deleteProductImages: `${baseUrl}/user/delete/product/image`,
    editProductImage: `${baseUrl}/user/edit/product/image`,
  
    userNotification: `${baseUrl}/user/all/notifications`,
    readNotification: `${baseUrl}/user/read/notification`,
  
    uploadUserLicense: `${baseUrl}/user/upload/license`,
    updateUserDetails: `${baseUrl}/user/update/details`,
    updateUserImage: `${baseUrl}/user/edit/profile/image`,
    requestHelp: `${baseUrl}/user/request/help`,
  
    loadCategories: `${baseUrl}/user/all/categories`,
    loadSuppliers: `${baseUrl}/user/all/suppliers`,
    loadProductsByCategories: `${baseUrl}/user/all/products/category`,
    loadProductsBySupplier: `${baseUrl}/user/all/products/supplier`,
    loadPopularProducts: `${baseUrl}/user/all/products/attribute/popular`,
    loadLatestProducts: `${baseUrl}/user/all/products/attribute/latest`,
  
    loadProduct: `${baseUrl}/user/product`,
  };
  
  export const fontConfig = {
    web: {
      regular: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
      light: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
      thin: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
    },
    ios: {
      regular: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
      light: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
      thin: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
    },
    android: {
      regular: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
      light: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
      thin: {
        fontFamily: "montserrat",
        fontWeight: "normal",
      },
    },
  };
  
  export const typeScale = {
    bodyLarge: {
      fontFamily: "montserrat",
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    bodyMedium: {
      fontFamily: "montserrat",
      fontSize: 14,
      fontWeight: "400",
      letterSpacing: 0.25,
      lineHeight: 20,
    },
    bodySmall: {
      fontFamily: "montserrat",
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0.4,
      lineHeight: 16,
    },
    displayLarge: {
      fontFamily: "montserrat",
      fontSize: 57,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 64,
    },
    displayMedium: {
      fontFamily: "montserrat",
      fontSize: 45,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 52,
    },
    displaySmall: {
      fontFamily: "montserrat",
      fontSize: 36,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 44,
    },
    headlineLarge: {
      fontFamily: "montserrat",
      fontSize: 32,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 40,
    },
    headlineMedium: {
      fontFamily: "montserrat",
      fontSize: 28,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 36,
    },
    headlineSmall: {
      fontFamily: "montserrat",
      fontSize: 24,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 32,
    },
    labelLarge: {
      fontFamily: "montserrat",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    labelMedium: {
      fontFamily: "montserrat",
      fontSize: 12,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelSmall: {
      fontFamily: "montserrat",
      fontSize: 11,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    titleLarge: {
      fontFamily: "montserrat",
      fontSize: 22,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 28,
    },
    titleMedium: {
      fontFamily: "montserrat",
      fontSize: 16,
      fontWeight: "500",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    titleSmall: {
      fontFamily: "montserrat",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
  };
  
  export const appIntroData = [
    {
      key: 1,
      title: "Welcome to VIP Bus Terminal!",
      text: "Where you can get all your medicines without any hustle from ghana",
      image: require("./src/images/Travel.png"),
      backgroundColor: "#f46036",
    },
    {
      key: 2,
      title: "A comfortable place to be!",
      text: "Over 500 medicines suppliers from ghana",
      image: require("./src/images/BusStop1.png"),
      backgroundColor: "#8f2d56",
    },
    {
      key: 3,
      title: "Thank you for choosing VIP!",
      text: "Suppliers provide you with amazing discounts hence, lower prices",
      image: require("./src/images/BoardBus.png"),
      backgroundColor: "#ff686b",
    },
  ];
  