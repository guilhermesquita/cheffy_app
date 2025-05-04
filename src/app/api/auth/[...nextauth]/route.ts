import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/features/instace/prisma";

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
        console.log("user:", user);  // Verifique o conteúdo do usuário
        const existingProfile = await prisma.profile.findUnique({
          where: { email: user.email! },
        });
  
        if (!existingProfile) {
          console.log("Criando novo perfil para", user.email);
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
  },
  
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
