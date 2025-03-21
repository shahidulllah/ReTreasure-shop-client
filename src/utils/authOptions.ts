import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
            credentials
          );
          const user = res.data.user;

          if (user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user._id;
        token.phone = user.phone;
        token.accessToken = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role as string;
      session.user.id = token.id as string;
      session.user.phone = token.phone as string;
      session.user.token = token.accessToken as string | undefined;
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
