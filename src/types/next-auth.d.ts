import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name: string;
      email: string;
      phone: string;
      image?: string
      token?: string; 
    };
  }

  interface User {
    _id: string;
    name: string;
    role: string;
    phone:string
    email: string;
    image?: string;
    token?: string; 
  }

  interface JWT {
    id: string;
    name: string;
    phone: string;
    email: string;
    role:string;
    token?: string;
  }
}
