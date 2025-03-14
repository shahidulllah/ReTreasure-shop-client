import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string
      token?: string; 
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    token?: string; 
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    token?: string;
  }
}
