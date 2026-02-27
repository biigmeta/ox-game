import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // เกิดตอน signin สำเร็จ (มี profile จาก Google)
    async signIn({ user, account, profile }) {
      // เช่น อนุญาตเฉพาะบางโดเมน
      // return (user.email ?? "").endsWith("@yourcompany.com");
      return true;
    },

    // เก็บ token เพิ่มลง JWT
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    // ส่ง token ไปให้ client ผ่าน session
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.sub = token.sub;
    
      return session;
    },
  },
});

export { handler as GET, handler as POST };