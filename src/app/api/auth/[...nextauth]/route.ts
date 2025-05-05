import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/features/instace/prisma";
import { JwtService } from "@/features/config/jwt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingProfile = await prisma.profile.findUnique({
          where: { email: user.email! },
        });
  
        if (!existingProfile) {
          await prisma.profile.create({
            data: {
              email: user.email!,
              name: user.name ?? "Sem nome",
              password: "", 
            },
          });
        }
  
        return true;
      } catch (error) {
        console.error("Erro ao verificar ou criar o perfil:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        const profile = await prisma.profile.findUnique({
          where: { email: user.email! },
        });
  
        if (profile) {
          token.id = profile.id;
          token.email = profile.email;
          token.name = profile.name;
  
          const jwtService = new JwtService();
          token.accessToken = jwtService.generateToken({ id: profile.id });
        }
      }
  
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.accessToken = token.accessToken as string;
      
      return session;
    },
  },  

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };