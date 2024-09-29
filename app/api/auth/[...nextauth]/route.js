import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord";
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
  
export const authOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login',   // Custom sign-in page
    error: '/auth/error',     // Custom error page
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    }),

  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      const allowedProviders = ['google', 'github', 'discord']
      if (allowedProviders.includes(account.provider)) {
        // profile.email_verified===true for google
        // profile.created_at=='2024-07-17T18:41:09Z' for github
        // profile.verified for discord

        try {
          await connectToDB();
          // check if user exists in database
          let currentUser = await User.findOne({ email: user.email })

          if (!currentUser) {
            // Generate base username
            let baseUsername = user.email.split('@')[0];
            let uniqueUsername = baseUsername;
            let count = 1;
            // Check if the username is unique, if not, append a counter
            while (await User.findOne({ username: uniqueUsername })) {
              uniqueUsername = `${baseUsername}${count}`;
              count++;
            }
            
            currentUser = new User({
              email: user.email,
              name: user.name,
              username: uniqueUsername,
              profilePic: user.image,
              provider: account.provider,
            })
            await currentUser.save()
          }
          return true;

        } catch (error) {
          return false;
        }
      }
      return false;
    },

    async session({ session, token, user }) {
      try{
        console.log('session requested')
        await connectToDB();
        let currentUser = await User.findOne({ email: session.user.email })
        session.user.name = currentUser.name;
        return session
      }
      catch(error){
        return session
      }
    h
      
    },
    


  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



// account.access_token


