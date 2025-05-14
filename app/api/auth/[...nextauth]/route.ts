import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Mock user database for demo purposes
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@illuminaattii.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Test User",
    email: "user@example.com",
    password: "password123",
    role: "user",
  },
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // In a real application, you would check against your database
        const user = users.find((user) => user.email === credentials.email)

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/api/auth/error",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST }