import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    // async session(params) {
    //   let { session, token } = params;
    //   session.user = token;
    //   return session;
    // },
    async jwt({ token }) {
      token.role = "admin";
      console.log(token);
      return token;
    },
  },
};

export default NextAuth(authOptions);
